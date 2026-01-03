const express = require("express");
const router = express.Router();
const {
  getAllBadges,
  getUserBadges,
  getBadgeById,
  getBadgesProgress,
  createBadge,
  updateBadge,
} = require("../controllers/badgeController");
const { protect, admin } = require("../middleware/auth");

// Public routes
router.get("/", getAllBadges);

// Protected routes
router.use(protect);

router.get("/user", getUserBadges);
router.get("/progress", getBadgesProgress);
router.get("/:id", getBadgeById);

// Admin routes
router.use(admin);
router.post("/", createBadge);
router.put("/:id", updateBadge);

module.exports = router;
