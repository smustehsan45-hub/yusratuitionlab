const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    price: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "active", "completed", "archived"], default: "active" },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
