const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  currentLevel: {
    type: Number,
    default: 1,
  },
  completedLessons: [
    {
      lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
      completedAt: Date,
      quizScore: Number,
    },
  ],
  quizAttempts: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      attempt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizAttempt",
      },
      score: Number,
      completedAt: Date,
    },
  ],
  skillMetrics: {
    accuracy: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    consistency: { type: Number, default: 0 },
    difficultyHandling: {
      easy: Number,
      medium: Number,
      hard: Number,
    },
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
