const User = require("../models/User");
const Subject = require("../models/Subject");
const UserProgress = require("../models/UserProgress");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");
const Interview = require("../models/Interview");
const { getAdaptiveQuestions } = require("../utils/adaptiveEngine");

// Get User Dashboard
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("badges").populate({
      path: "subjects.subjectId",
      select: "name icon description",
    });

    // 2. FETCH PENDING INTERVIEWS FOR THIS USER
    // We look for interviews that are not yet "completed"
    const pendingInterviews = await Interview.find({
      user: userId,
      status: { $ne: "completed" },
    })
      .populate("subject", "name icon")
      .lean();

    const progress = await UserProgress.find({ user: userId }).populate(
      "subject",
      "name icon"
    );

    const dashboardData = {
      user,
      pendingInterviews, // 3. INCLUDE THIS IN THE RESPONSE
      stats: {
        totalPoints: user.points,
        currentLevel: user.level,
        currentStreak: user.streak.current,
        totalSubjects: user.subjects.length,
        completedSubjects: user.subjects.filter((s) => s.isCompleted).length,
      },
      progress,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: error.message });
  }
};
const markTheoryCompleted = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const user = await User.findById(req.user.id);
    const userSubject = user.subjects.find(
      (s) => s.subjects && s.subjects.includes(lessonId)
    );
    res.json({ message: "Success", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveSubjectRating = async (req, res) => {
  try {
    const { subjectId, rating } = req.body;

    if (!subjectId || !rating)
      return res.status(400).json({ message: "Missing data" });

    const user = await User.findById(req.user.id);
    const subject = await Subject.findById(subjectId);

    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const userSubject = user.subjects.find(
      (s) => s.subjectId.toString() === subjectId
    );

    if (!userSubject)
      return res.status(404).json({ message: "Subject not enrolled" });
    if (userSubject.hasSetRating)
      return res.status(403).json({ message: "Rating locked" });

    const ratingInt = parseInt(rating);

    // --- RECTIFIED LEVEL 1 GENERATION (NO THEORY) ---
    let lesson = await Lesson.findOne({
      subject: subject._id,
      level: 1,
      ratingGroup: ratingInt,
    });

    if (!lesson) {
      console.log(
        `[Generator] Creating Level 1 for ${subject.name} (Rating ${ratingInt})`
      );

      // Determine difficulty
      let initialDifficulty = "easy";
      if (ratingInt > 7) initialDifficulty = "hard";
      else if (ratingInt > 3) initialDifficulty = "medium";

      // Fetch questions
      const rawQuestions = getAdaptiveQuestions(
        subject.name,
        initialDifficulty,
        10
      ); // 10 questions per level

      // Clean Questions
      const questions = rawQuestions.map((q) => ({
        question: q.question,
        options: q.options,
        difficulty: q.difficulty,
        explanation: q.explanation,
        topic: q.topic,
        points: q.points || 10,
      }));

      if (questions.length > 0) {
        lesson = new Lesson({
          subject: subject._id,
          level: 1,
          ratingGroup: ratingInt,
          title: `Level 1: Placement Assessment`,
          // CONTENT IS NOW JUST A BRIEFING, NO THEORY
          content: `### Mission Briefing\n\nWelcome to **${subject.name}**.\n\nBased on your self-assessment, we have initialized the simulation at **${initialDifficulty.toUpperCase()}** difficulty.\n\n**Objective:** Complete this assessment to analyze your baseline proficiency and identify weak zones.`,
          estimatedTime: 10,
        });
        await lesson.save();

        const quiz = new Quiz({
          lesson: lesson._id,
          title: `Level 1 Assessment (${initialDifficulty})`,
          questions: questions,
          timeLimit: 600,
          passingScore: 50,
        });
        await quiz.save();

        lesson.quiz = quiz._id;
        await lesson.save();

        subject.lessons.push(lesson._id);
        await subject.save();
      } else {
        console.warn(`[Generator] Not enough questions for ${subject.name}`);
      }
    }

    // Update User
    userSubject.skillLevel = ratingInt;
    userSubject.hasSetRating = true;

    await user.save();

    await UserProgress.findOneAndUpdate(
      { user: req.user.id, subject: subjectId },
      { $set: { "skillMetrics.rating": rating } },
      { upsert: true }
    );

    res.status(200).json({ success: true, rating });
  } catch (error) {
    console.error("Save Rating Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const addSubject = async (req, res) => {
  try {
    const { subjectId, skillLevel } = req.body;
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const user = await User.findById(req.user.id);
    const existingSubject = user.subjects.find(
      (s) => s.subjectId.toString() === subjectId
    );
    if (existingSubject)
      return res.status(400).json({ message: "Subject already added" });

    user.subjects.push({
      subjectId,
      skillLevel,
      currentLevel: 1,
    });
    await user.save();

    await UserProgress.create({
      user: user._id,
      subject: subjectId,
      skillMetrics: { difficultyHandling: { easy: 0, medium: 0, hard: 0 } },
    });

    res.status(201).json({ message: "Subject added", subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({
      message: "Profile updated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        points: user.points,
        level: user.level,
        streak: user.streak,
        subjects: user.subjects,
        badges: user.badges,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const leaderboard = await User.find({})
      .select("name avatar points level streak.current badges")
      .populate("badges", "name icon")
      .sort({ points: -1, level: -1 })
      .limit(parseInt(limit));
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboard,
  addSubject,
  updateProfile,
  getLeaderboard,
  saveSubjectRating,
  markTheoryCompleted,
};
