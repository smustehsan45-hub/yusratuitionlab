const express = require("express");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const adminController = require("../controllers/admin.controller");
const applicationController = require("../controllers/application.controller");

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.get("/dashboard", adminController.getDashboard);

router.get("/tutors", adminController.getTutors);
router.post("/tutors", adminController.createTutor);
router.put("/tutors/:id", adminController.updateTutor);
router.delete("/tutors/:id", adminController.deleteTutor);

router.get("/students", adminController.getStudents);
router.put("/students/:id", adminController.updateStudent);
router.delete("/students/:id", adminController.deleteStudent);
router.post("/students/:id/payments", adminController.addStudentPayment);

router.get("/courses", adminController.getCourses);
router.post("/courses", adminController.createCourse);
router.put("/courses/:id", adminController.updateCourse);
router.delete("/courses/:id", adminController.deleteCourse);

router.get("/attendance", adminController.getAttendance);

router.get("/batches", adminController.getBatches);
router.post("/batches", adminController.createBatch);
router.put("/batches/:id", adminController.updateBatch);
router.delete("/batches/:id", adminController.deleteBatch);

router.get("/announcements", adminController.getAnnouncements);
router.post("/announcements", adminController.createAnnouncement);
router.put("/announcements/:id", adminController.updateAnnouncement);
router.delete("/announcements/:id", adminController.deleteAnnouncement);

// Applications (admin only)
router.get("/applications", applicationController.getApplications);
router.post("/applications/:id/approve", applicationController.approveApplication);
router.post("/applications/:id/reject", applicationController.rejectApplication);

module.exports = router;
