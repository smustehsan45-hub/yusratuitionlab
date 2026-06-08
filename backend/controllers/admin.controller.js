const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model");
const Tutor = require("../models/tutor.model");
const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Attendance = require("../models/attendance.model");
const Batch = require("../models/batch.model");
const Announcement = require("../models/announcement.model");
const { getRecentActivity } = require("../utils/activityLog");

const getDashboard = async (req, res, next) => {
  try {
    const totalTutors = await Tutor.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalBatches = await Batch.countDocuments();
    const totalAnnouncements = await Announcement.countDocuments();

    const payments = await Student.aggregate([
      { $unwind: { path: "$payments", preserveNullAndEmptyArrays: true } },
      { $group: { _id: null, totalPaid: { $sum: "$payments.amount" } } },
    ]);

    const totalRevenue = payments[0]?.totalPaid || 0;
    const recentActivity = await getRecentActivity(5);

    res.json({
      success: true,
      data: {
        totalTutors,
        totalStudents,
        totalCourses,
        totalBatches,
        totalAnnouncements,
        totalRevenue,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTutors = async (req, res, next) => {
  try {
    const tutors = await Tutor.find().select("-password").populate("courses", "title").populate("students", "name email");
    res.json({ success: true, data: tutors });
  } catch (error) {
    next(error);
  }
};

const createTutor = async (req, res, next) => {
  try {
    const { name, email, password, phone, specialization, experience, bio } = req.body;
    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) {
      return res.status(409).json({ message: "Tutor email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const tutor = await Tutor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      experience,
      bio,
    });
    const safeTutor = await Tutor.findById(tutor._id).select("-password");
    res.status(201).json({ success: true, data: safeTutor });
  } catch (error) {
    next(error);
  }
};

const updateTutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }
    const tutor = await Tutor.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!tutor) return res.status(404).json({ message: "Tutor not found." });
    res.json({ success: true, data: tutor });
  } catch (error) {
    next(error);
  }
};

const deleteTutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findById(id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found." });

    const tutorCourses = await Course.find({ tutor: id }).select("_id");
    const courseIds = tutorCourses.map((course) => course._id);

    await Tutor.findByIdAndDelete(id);
    await Course.deleteMany({ tutor: id });
    await Student.updateMany({ tutor: id }, { $unset: { tutor: "" } });
    if (courseIds.length) {
      await Student.updateMany(
        { enrolledCourses: { $in: courseIds } },
        { $pull: { enrolledCourses: { $in: courseIds } } }
      );
    }
    await Tutor.updateMany({}, { $pull: { students: { $in: tutor.students || [] } } });
    await Attendance.deleteMany({ tutor: id });
    await Batch.deleteMany({ tutor: id });

    res.json({ success: true, message: "Tutor deleted successfully." });
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().select("-password").populate("tutor", "name email").populate("enrolledCourses", "title");
    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    const student = await Student.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found." });
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found." });

    await Student.findByIdAndDelete(id);
    await Course.updateMany({}, { $pull: { students: id } });
    await Tutor.updateMany({}, { $pull: { students: id } });
    await Attendance.deleteMany({ student: id });
    await Batch.updateMany({}, { $pull: { students: id } });

    res.json({ success: true, message: "Student deleted successfully." });
  } catch (error) {
    next(error);
  }
};

const addStudentPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, method, status } = req.body;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found." });

    const payment = { amount, method, status };
    student.payments.push(payment);
    student.feePaid += amount;
    await student.save();

    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("tutor", "name email").populate("batch", "name");
    res.json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, tutorId, batchId, price, startDate, endDate } = req.body;
    const course = await Course.create({
      title,
      description,
      tutor: tutorId,
      batch: batchId,
      price,
      startDate,
      endDate,
    });
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found." });
    res.json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: "Course not found." });
    res.json({ success: true, message: "Course deleted successfully." });
  } catch (error) {
    next(error);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find()
      .populate("student", "name email")
      .populate("tutor", "name email")
      .populate("course", "title");
    res.json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

const getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().populate("course", "title").populate("tutor", "name email");
    res.json({ success: true, data: batches });
  } catch (error) {
    next(error);
  }
};

const createBatch = async (req, res, next) => {
  try {
    const { name, course, tutor, students, startDate, endDate, status } = req.body;
    const batch = await Batch.create({ name, course, tutor, students, startDate, endDate, status });
    res.status(201).json({ success: true, data: batch });
  } catch (error) {
    next(error);
  }
};

const updateBatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findByIdAndUpdate(id, req.body, { new: true });
    if (!batch) return res.status(404).json({ message: "Batch not found." });
    res.json({ success: true, data: batch });
  } catch (error) {
    next(error);
  }
};

const deleteBatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findByIdAndDelete(id);
    if (!batch) return res.status(404).json({ message: "Batch not found." });
    res.json({ success: true, message: "Batch deleted successfully." });
  } catch (error) {
    next(error);
  }
};

const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().populate("postedBy", "name email");
    res.json({ success: true, data: announcements });
  } catch (error) {
    next(error);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const { title, content, targetRole } = req.body;
    const announcement = await Announcement.create({ title, content, targetRole, postedBy: req.user._id });
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

const updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });
    res.json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });
    res.json({ success: true, message: "Announcement deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getTutors,
  createTutor,
  updateTutor,
  deleteTutor,
  getStudents,
  updateStudent,
  deleteStudent,
  addStudentPayment,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getAttendance,
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
