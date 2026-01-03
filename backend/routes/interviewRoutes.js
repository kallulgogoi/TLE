const express = require("express");
const router = express.Router();
const {
  getInterviewById,
  submitInterview,
} = require("../controllers/interviewController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/:id", getInterviewById);
router.post("/:id/submit", submitInterview);

module.exports = router;
