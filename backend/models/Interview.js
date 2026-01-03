const mongoose = require("mongoose");

const interviewQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index 0-3
  type: { type: String, default: "technical" },
  topic: String,
  explanation: String,
});

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: { type: String, default: "Final Assessment" },
  questions: [interviewQuestionSchema],
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedOption: Number,
      isCorrect: Boolean,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
});

module.exports = mongoose.model("Interview", interviewSchema);
