const express = require("express");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const tutorController = require("../controllers/tutor.controller");

const router = express.Router();

router.get("/public", tutorController.getPublicTutors);

router.use(authenticate, authorize("tutor"));

router.get("/profile", tutorController.getProfile);
router.put("/profile", tutorController.updateProfile);
router.get("/courses", tutorController.getMyCourses);
router.get("/students", tutorController.getMyStudents);
router.get("/attendance", tutorController.getAttendance);
router.post("/attendance", tutorController.recordAttendance);
router.post("/schedule", tutorController.addScheduleItem);
router.delete("/schedule/:scheduleId", tutorController.removeScheduleItem);
router.post("/notes", tutorController.addNote);
router.delete("/notes/:noteId", tutorController.deleteNote);

module.exports = router;
