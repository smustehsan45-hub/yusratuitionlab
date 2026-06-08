const express = require("express");
const { authenticate } = require("../middleware/auth.middleware");
const batchController = require("../controllers/batch.controller");

const router = express.Router();

router.use(authenticate);
router.get("/", batchController.getAllBatches);
router.get("/:id", batchController.getBatchById);
router.post("/", batchController.createBatch);
router.put("/:id", batchController.updateBatch);
router.delete("/:id", batchController.deleteBatch);

module.exports = router;
