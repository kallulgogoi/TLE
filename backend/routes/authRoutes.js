const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  googleAuthCallback,
  getMe,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Initialize Google Auth config
require("../config/googleAuth")(passport);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleAuthCallback
);

// Get current user
router.get("/me", protect, getMe);

// Logout
router.post("/logout", protect, logout);

module.exports = router;
