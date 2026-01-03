const express = require("express");
const router = express.Router();
const {
  analyzePerformance,
  predictInterviewReadiness,
} = require("../controllers/mlController");
const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

// Analyze user performance for a subject
router.get("/performance/:subjectId", analyzePerformance);

// Predict interview readiness for a subject
router.get("/readiness/:subjectId", predictInterviewReadiness);

module.exports = router;
