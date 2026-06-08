const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const Tutor = require("../models/tutor.model");
const Student = require("../models/student.model");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, role } = decoded;

    let user;
    if (role === "admin") user = await Admin.findById(id).select("-password");
    if (role === "tutor") user = await Tutor.findById(id).select("-password");
    if (role === "student" || role === "user") user = await Student.findById(id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token." });
    }

    req.user = user;
    req.user.role = role;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Failed to authenticate user.", error: error.message });
  }
};

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "You do not have permission to access this resource." });
  }
  next();
};

module.exports = {
  authenticate,
  authorize,
};
