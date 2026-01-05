const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  criteria: {
    type: String,
    enum: [
      "points",
      "streak",
      "subject_completion",
      "accuracy",
      "quizzes_taken",
    ],
    required: true,
  },
  threshold: {
    type: Number,
    required: true,
  },
  rarity: {
    type: String,
    enum: ["common", "rare", "epic", "legendary"],
    default: "common",
  },
  pointsReward: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Badge", badgeSchema);
