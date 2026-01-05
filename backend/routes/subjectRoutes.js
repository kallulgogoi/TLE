const express = require("express");
const router = express.Router();
const {
  getSubjects,
  getSubjectById,
  createSubject,
  generateLessons,
} = require("../controllers/subjectController");
const { protect, admin } = require("../middleware/auth");

// Public routes
router.get("/", getSubjects);
router.get("/:id", protect, getSubjectById);

// Protected routes
router.use(protect);

// Generate lessons based on skill level
router.post("/:subjectId/generate-lessons", generateLessons);

// Admin routes
router.use(admin);
router.post("/", createSubject);

module.exports = router;
