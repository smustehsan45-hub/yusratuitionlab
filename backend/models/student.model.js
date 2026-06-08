const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    method: { type: String, default: "online" },
    paidAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["completed", "pending", "failed"], default: "completed" },
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user","student"] },
    phone: { type: String },
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    interestedCourses: [{ type: String }],
    payments: [paymentSchema],
    feePaid: { type: Number, default: 0 },
    feeBalance: { type: Number, default: 0 },
    feeSettled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
