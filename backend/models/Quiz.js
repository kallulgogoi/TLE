// server/models/Quiz.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
  explanation: {
    type: String,
    default: "",
  },
  topic: {
    type: String,
    default: "General",
  },
  points: {
    type: Number,
    default: 10,
  },
});

const quizSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  timeLimit: {
    type: Number, // in seconds
    default: 600,
  },
  passingScore: {
    type: Number,
    default: 50, // Changed to 50 as per adaptive logic
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
