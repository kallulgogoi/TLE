const express = require("express");
const router = express.Router();
const {
  startQuiz,
  submitQuiz,
  getQuizResults,
  getQuizHistory,
} = require("../controllers/quizController");
const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

// Start quiz for a lesson
router.get("/lesson/:lessonId/start", startQuiz);

// Submit quiz
router.post("/:quizId/submit", submitQuiz);

// Get quiz results
router.get("/results/:quizAttemptId", getQuizResults);

// Get quiz history
router.get("/history", getQuizHistory);

module.exports = router;
