const express = require("express");
const router = express.Router();
const {
  getDashboard,
  addSubject,
  updateProfile,
  getLeaderboard,
  saveSubjectRating,
  markTheoryCompleted,
} = require("../controllers/userController");

const { protect } = require("../middleware/auth");

router.use(protect);

// Dashboard
router.get("/dashboard", getDashboard);

router.post("/subjects", addSubject);

// Update profile
router.put("/profile", updateProfile);

// Leaderboard
router.get("/leaderboard", getLeaderboard);

// Rating
router.post("/subject/rating", saveSubjectRating);

router.post("/lesson/complete-theory", markTheoryCompleted);

module.exports = router;
