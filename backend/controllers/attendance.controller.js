const Attendance = require("../models/attendance.model");

const getAllAttendance = async (req, res, next) => {
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

const getAttendanceById = async (req, res, next) => {
  try {
    const record = await Attendance.findById(req.params.id)
      .populate("student", "name email")
      .populate("tutor", "name email")
      .populate("course", "title");
    if (!record) return res.status(404).json({ message: "Attendance record not found." });
    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const createAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ message: "Attendance record not found." });
    res.json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ message: "Attendance record not found." });
    res.json({ success: true, message: "Attendance record removed." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
