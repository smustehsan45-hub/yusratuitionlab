const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String },
    roleRequested: { type: String, enum: ["student", "tutor"], required: true },
    experience: { type: String },
    bio: { type: String },
    selectedCourses: [{ type: String }],
    message: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    processedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
