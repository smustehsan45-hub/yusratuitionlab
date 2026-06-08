const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const courseController = require("../controllers/course.controller");

const router = express.Router();

router.use(authenticate);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
