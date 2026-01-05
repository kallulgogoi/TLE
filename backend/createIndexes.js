require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Subject = require("./models/Subject");
const Lesson = require("./models/Lesson");
const Quiz = require("./models/Quiz");
const QuizAttempt = require("./models/QuizAttempt");

const createIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB. Creating indexes...");
    await User.collection.createIndex({ email: 1 });
    await User.collection.createIndex({ googleId: 1 });
    // Index arrays for faster search
    await User.collection.createIndex({ "subjects.subjectId": 1 });
    await Lesson.collection.createIndex({ subject: 1, level: 1 });
    await Quiz.collection.createIndex({ lesson: 1 });
    await QuizAttempt.collection.createIndex({ user: 1 });
    await QuizAttempt.collection.createIndex({ user: 1, subject: 1 });
    await QuizAttempt.collection.createIndex({ completedAt: -1 });

    console.log("Indexes Created Successfully! App should be fast .");
    process.exit();
  } catch (err) {
    console.error("Error creating indexes:", err);
    process.exit(1);
  }
};

createIndexes();
