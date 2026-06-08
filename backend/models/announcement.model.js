const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    targetRole: { type: String, enum: ["admin", "tutor", "student", "all"], default: "all" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);
