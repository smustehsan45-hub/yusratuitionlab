const Batch = require("../models/batch.model");

const getAllBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().populate("course", "title").populate("tutor", "name email");
    res.json({ success: true, data: batches });
  } catch (error) {
    next(error);
  }
};

const getBatchById = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id).populate("course", "title").populate("tutor", "name email");
    if (!batch) return res.status(404).json({ message: "Batch not found." });
    res.json({ success: true, data: batch });
  } catch (error) {
    next(error);
  }
};

const createBatch = async (req, res, next) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json({ success: true, data: batch });
  } catch (error) {
    next(error);
  }
};

const updateBatch = async (req, res, next) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!batch) return res.status(404).json({ message: "Batch not found." });
    res.json({ success: true, data: batch });
  } catch (error) {
    next(error);
  }
};

const deleteBatch = async (req, res, next) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) return res.status(404).json({ message: "Batch not found." });
    res.json({ success: true, message: "Batch deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
};
