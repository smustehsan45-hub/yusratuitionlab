const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const announcementController = require("../controllers/announcement.controller");

const router = express.Router();

router.use(authenticate);
router.get("/", announcementController.getAllAnnouncements);
router.get("/:id", announcementController.getAnnouncementById);
router.post("/", announcementController.createAnnouncement);
router.put("/:id", announcementController.updateAnnouncement);
router.delete("/:id", announcementController.deleteAnnouncement);

module.exports = router;
