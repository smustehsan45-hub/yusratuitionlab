const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const attendanceController = require("../controllers/attendance.controller");

const router = express.Router();

router.use(authenticate);
router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.post("/", attendanceController.createAttendance);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
