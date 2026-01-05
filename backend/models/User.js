const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  streak: {
    current: {
      type: Number,
      default: 0,
    },
    longest: {
      type: Number,
      default: 0,
    },
    lastActive: Date,
  },
  badges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
    },
  ],
  subjects: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      skillLevel: {
        type: Number,
        min: 1,
        max: 10,
        default: 1, // Default rating is 1
      },
      // --- NEW FIELD: Tracks if the user has locked their rating ---
      hasSetRating: {
        type: Boolean,
        default: false, // Starts as false, becomes true after they set it
      },
      // -------------------------------------------------------------
      currentLevel: {
        type: Number,
        default: 1,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
      // Tracks lessons where theory is read
      theoryCompletedLessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
      ],
      // Tracks lessons where quiz is passed
      completedLessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
      ],
      accuracy: {
        type: Number,
        default: 0,
      },
      totalQuizzes: {
        type: Number,
        default: 0,
      },
      lastAttempted: Date,
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

// Update streak method
userSchema.methods.updateStreak = function () {
  const today = new Date();
  const lastActive = this.streak.lastActive
    ? new Date(this.streak.lastActive)
    : null;

  if (!lastActive) {
    this.streak.current = 1;
  } else {
    const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      this.streak.current += 1;
    } else if (diffDays > 1) {
      this.streak.current = 1;
    }
  }

  if (this.streak.current > this.streak.longest) {
    this.streak.longest = this.streak.current;
  }

  this.streak.lastActive = today;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
