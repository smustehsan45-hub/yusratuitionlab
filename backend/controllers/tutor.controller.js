const bcrypt = require("bcryptjs");
const Tutor = require("../models/tutor.model");
const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Attendance = require("../models/attendance.model");
const { syncTutorCourses } = require("../utils/courseSync");

const getProfile = async (req, res, next) => {
  try {
    const tutorDoc = await Tutor.findById(req.user._id);
    if (!tutorDoc) return res.status(404).json({ message: "Tutor profile not found." });

    if (tutorDoc.teachingCourses?.length) {
      await syncTutorCourses(tutorDoc);
    }

    const tutor = await Tutor.findById(req.user._id)
      .select("-password")
      .populate("courses", "title price status students")
      .populate("students", "name email status");
    res.json({ success: true, data: tutor });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }
    const tutor = await Tutor.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    if (!tutor) return res.status(404).json({ message: "Tutor not found." });
    res.json({ success: true, data: tutor });
  } catch (error) {
    next(error);
  }
};

const getMyCourses = async (req, res, next) => {
  try {
    const tutor = await Tutor.findById(req.user._id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found." });

    if (tutor.teachingCourses?.length) {
      await syncTutorCourses(tutor);
    }

    const courses = await Course.find({ tutor: req.user._id }).populate("students", "name email");
    res.json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

const getMyStudents = async (req, res, next) => {
  try {
    const students = await Student.find({ tutor: req.user._id }).populate("enrolledCourses", "title");
    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({ tutor: req.user._id })
      .populate("student", "name email")
      .populate("course", "title");
    res.json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

const recordAttendance = async (req, res, next) => {
  try {
    const { studentId, courseId, status, notes, date } = req.body;
    const record = await Attendance.create({
      student: studentId,
      tutor: req.user._id,
      course: courseId,
      status,
      notes,
      date: date ? new Date(date) : Date.now(),
    });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const addScheduleItem = async (req, res, next) => {
  try {
    const { title, description, date } = req.body;
    const tutor = await Tutor.findById(req.user._id);
    tutor.schedule.push({ title, description, date });
    await tutor.save();
    res.status(201).json({ success: true, data: tutor.schedule });
  } catch (error) {
    next(error);
  }
};

const removeScheduleItem = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const tutor = await Tutor.findById(req.user._id);
    tutor.schedule = tutor.schedule.filter((item) => item._id.toString() !== scheduleId);
    await tutor.save();
    res.json({ success: true, data: tutor.schedule });
  } catch (error) {
    next(error);
  }
};

const addNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const tutor = await Tutor.findById(req.user._id);
    tutor.notes.push({ title, content });
    await tutor.save();
    res.status(201).json({ success: true, data: tutor.notes });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const tutor = await Tutor.findById(req.user._id);
    tutor.notes = tutor.notes.filter((note) => note._id.toString() !== noteId);
    await tutor.save();
    res.json({ success: true, data: tutor.notes });
  } catch (error) {
    next(error);
  }
};

const getPublicTutors = async (req, res, next) => {
  try {
    const tutors = await Tutor.find({ status: "active" })
      .select("name specialization teachingCourses students bio")
      .lean();

    res.json({ success: true, data: tutors });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getMyCourses,
  getMyStudents,
  getAttendance,
  recordAttendance,
  addScheduleItem,
  removeScheduleItem,
  addNote,
  deleteNote,
  getPublicTutors,
};
