const bcrypt = require("bcryptjs");
const Application = require("../models/application.model");
const Student = require("../models/student.model");
const Tutor = require("../models/tutor.model");
const { syncTutorCourses, enrollStudentInCourses } = require("../utils/courseSync");
const getClientIp = require("../utils/getClientIp");
const { notifyApplicationSubmitted, notifyApplicationDecision } = require("../utils/mail");
const { logActivity } = require("../utils/activityLog");

const emailApplicationDecision = async (app, { status, tempPassword, note }) => {
  await notifyApplicationDecision({
    status,
    name: app.name,
    email: app.email,
    roleRequested: app.roleRequested,
    selectedCourses: app.selectedCourses,
    tempPassword,
    note,
  });
};

const createApplication = async (req, res, next) => {
  try {
    const { name, email, phone, roleRequested, experience, bio, selectedCourses, message } = req.body;
    if (!name || !email || !roleRequested) {
      return res.status(400).json({ message: "Name, email and roleRequested are required." });
    }

    const existing = await Application.findOne({ email, roleRequested, status: "pending" });
    if (existing) return res.status(409).json({ message: "You already have a pending application." });

    const application = await Application.create({
      name,
      email,
      phone,
      roleRequested,
      experience: experience || "",
      bio: bio || "",
      selectedCourses: Array.isArray(selectedCourses) ? selectedCourses : [],
      message,
      submittedBy: req.user?._id || null,
    });

    notifyApplicationSubmitted({
      name,
      email,
      phone,
      roleRequested,
      currentRole: req.user?.role,
      selectedCourses: application.selectedCourses,
      experience: application.experience,
      bio: application.bio,
      message: application.message,
      ipAddress: getClientIp(req),
      timestamp: new Date(),
    });

    logActivity({
      type: "application",
      name,
      email,
      role: roleRequested,
      applicationId: application._id,
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

const getApplications = async (req, res, next) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (error) {
    next(error);
  }
};

const approveApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Application not found." });
    if (app.status !== "pending") return res.status(400).json({ message: "Application already processed." });

    // Check if a user with same email already exists
    const existingStudent = await Student.findOne({ email: app.email });
    const existingTutor = await Tutor.findOne({ email: app.email });

    let tempPassword = null;
    let createdUser = null;

    if (existingTutor) {
      app.status = "rejected";
      app.processedBy = req.user._id;
      app.processedAt = new Date();
      await app.save();
      await emailApplicationDecision(app, {
        status: "rejected",
        note: "A tutor account with this email already exists.",
      });
      return res.status(409).json({ message: "A tutor with this email already exists; application rejected." });
    }

    if (existingStudent) {
      // if existing is a generic user, upgrade or migrate
      if (app.roleRequested === "student") {
        if (existingStudent.role === "student") {
          app.status = "rejected";
          app.processedBy = req.user._id;
          app.processedAt = new Date();
          await app.save();
          await emailApplicationDecision(app, {
            status: "rejected",
            note: "A student account with this email already exists.",
          });
          return res.status(409).json({ message: "A student with this email already exists; application rejected." });
        }
        // upgrade generic user to student
        existingStudent.role = "student";
        existingStudent.interestedCourses = app.selectedCourses || existingStudent.interestedCourses;
        await existingStudent.save();
        await enrollStudentInCourses(existingStudent);
        createdUser = existingStudent;
      } else if (app.roleRequested === "tutor") {
        // migrate generic user to tutor account
        const tutor = await Tutor.create({
          name: existingStudent.name || app.name,
          email: existingStudent.email,
          phone: existingStudent.phone || app.phone,
          password: existingStudent.password,
          experience: app.experience || "",
          bio: app.bio || "",
          teachingCourses: app.selectedCourses || [],
        });
        await syncTutorCourses(tutor);
        // remove the generic user to avoid duplicates
        await Student.findByIdAndDelete(existingStudent._id);
        createdUser = tutor;
      }
    } else {
      // no existing user: create fresh account and return temporary password
      tempPassword = Math.random().toString(36).slice(2, 10) + "A1!";
      const hashed = await bcrypt.hash(tempPassword, 12);

      if (app.roleRequested === "student") {
        createdUser = await Student.create({
          name: app.name,
          email: app.email,
          phone: app.phone,
          password: hashed,
          role: "student",
          interestedCourses: app.selectedCourses || [],
        });
        await enrollStudentInCourses(createdUser);
      } else if (app.roleRequested === "tutor") {
        createdUser = await Tutor.create({
          name: app.name,
          email: app.email,
          phone: app.phone,
          password: hashed,
          experience: app.experience || "",
          bio: app.bio || "",
          teachingCourses: app.selectedCourses || [],
        });
        await syncTutorCourses(createdUser);
      }
    }

    app.status = "approved";
    app.processedBy = req.user._id;
    app.processedAt = new Date();
    await app.save();

    await emailApplicationDecision(app, {
      status: "approved",
      tempPassword: tempPassword || undefined,
    });

    res.json({ success: true, message: "Application approved.", data: { createdUserId: createdUser._id, tempPassword } });
  } catch (error) {
    next(error);
  }
};

const getMyApplication = async (req, res, next) => {
  try {
    const app = await Application.findOne({
      email: req.user.email,
      status: { $in: ["pending", "approved"] },
    });
    if (!app) {
      return res.json({ success: true, data: null });
    }
    res.json({ success: true, data: app });
  } catch (error) {
    next(error);
  }
};

const rejectApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Application not found." });
    if (app.status !== "pending") return res.status(400).json({ message: "Application already processed." });

    app.status = "rejected";
    app.processedBy = req.user._id;
    app.processedAt = new Date();
    await app.save();

    await emailApplicationDecision(app, { status: "rejected" });

    res.json({ success: true, message: "Application rejected." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplications,
  getMyApplication,
  approveApplication,
  rejectApplication,
};
