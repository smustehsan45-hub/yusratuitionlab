const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const applicationController = require("../controllers/application.controller");

const router = express.Router();

// get current user's application status (requires sign-in)
router.get("/me", authenticate, applicationController.getMyApplication);

// create application (requires sign-in)
router.post("/", authenticate, applicationController.createApplication);

module.exports = router;
