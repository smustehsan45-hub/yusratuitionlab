const Announcement = require("../models/announcement.model");

const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().populate("postedBy", "name email");
    res.json({ success: true, data: announcements });
  } catch (error) {
    next(error);
  }
};

const getAnnouncementById = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate("postedBy", "name email");
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });
    res.json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.create({ ...req.body, postedBy: req.user._id });
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
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
