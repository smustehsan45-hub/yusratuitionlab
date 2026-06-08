const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Admin = require("../models/admin.model");
const Tutor = require("../models/tutor.model");
const Student = require("../models/student.model");
const getClientIp = require("../utils/getClientIp");
const { notifyAuthActivity } = require("../utils/mail");
const { logActivity } = require("../utils/activityLog");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role || "user" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user);
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
  };

  res.cookie("token", token, cookieOptions);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    const tutor = admin ? null : await Tutor.findOne({ email });
    const student = admin || tutor ? null : await Student.findOne({ email });
    const user = admin || tutor || student;
    const role = admin
      ? "admin"
      : tutor
        ? "tutor"
        : student
          ? student.role === "student"
            ? "student"
            : "user"
          : null;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    notifyAuthActivity({
      event: "login",
      role,
      email: user.email,
      name: user.name,
      ipAddress: getClientIp(req),
    });

    logActivity({
      type: "login",
      name: user.name,
      email: user.email,
      role,
    });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const registerStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    notifyAuthActivity({
      event: "login",
      role: student.role || "user",
      email: student.email,
      name: student.name,
      ipAddress: getClientIp(req),
    });

    logActivity({
      type: "login",
      name: student.name,
      email: student.email,
      role: student.role || "user",
    });

    sendTokenResponse(student, 201, res);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  logActivity({
    type: "logout",
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });

  res.clearCookie("token");
  return res.json({ success: true, message: "Logged out successfully." });
};

module.exports = {
  login,
  registerStudent,
  logout,
};
