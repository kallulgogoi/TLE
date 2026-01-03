const express = require("express");
const router = express.Router();
const {
  getLessonsBySubject,
  getLessonById,
  createLesson,
  updateLesson,
  markLessonCompleted,
} = require("../controllers/lessonController");

const { protect, admin } = require("../middleware/auth");

// Public or Protected Routes
router.get("/subject/:subjectId", protect, getLessonsBySubject);
router.get("/:id", protect, getLessonById);
router.post("/:lessonId/complete", protect, markLessonCompleted);

// Admin Routes
router.post("/", protect, admin, createLesson);
router.put("/:id", protect, admin, updateLesson);

module.exports = router;
