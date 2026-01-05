const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require("passport");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Google Auth Callback
const googleAuthCallback = async (req, res) => {
  try {
    const token = generateToken(req.user._id);

    // Update last login
    req.user.lastLogin = new Date();
    await req.user.save();

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}&userId=${req.user._id}`
    );
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
  }
};

// Get Current User
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("badges")
      .populate("subjects.subjectId");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    // In case you want to implement token blacklisting
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  googleAuthCallback,
  getMe,
  logout,
};
