const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 15,
  },
  ratingGroup: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: String,
  examples: [
    {
      title: String,
      code: String,
      explanation: String,
    },
  ],
  prerequisites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  estimatedTime: {
    type: Number,
    default: 30,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
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

module.exports = mongoose.model("Lesson", lessonSchema);
