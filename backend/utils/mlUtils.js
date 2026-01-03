const QuizAttempt = require("../models/QuizAttempt");
const UserProgress = require("../models/UserProgress");

// Calculate skill level based on quiz performance
const calculateSkillLevel = async (userId, subjectId) => {
  try {
    const quizAttempts = await QuizAttempt.find({
      user: userId,
      subject: subjectId,
    })
      .sort({ completedAt: -1 })
      .limit(10);

    if (quizAttempts.length === 0) return 1;

    // Calculate weighted average of recent performance
    let totalWeight = 0;
    let weightedScore = 0;

    quizAttempts.forEach((attempt, index) => {
      const weight = 1 / (index + 1); // Recent attempts weigh more
      weightedScore += attempt.accuracy * weight;
      totalWeight += weight;
    });

    const averageAccuracy = weightedScore / totalWeight;

    // Map accuracy to skill level (1-10)
    let skillLevel = Math.floor((averageAccuracy / 100) * 9) + 1;

    // Adjust based on difficulty of questions attempted
    const hardAttempts = quizAttempts.filter((a) => a.level >= 10).length;
    if (hardAttempts >= 3) skillLevel = Math.min(10, skillLevel + 1);

    return Math.max(1, Math.min(10, skillLevel));
  } catch (error) {
    console.error("Error calculating skill level:", error);
    return 1;
  }
};

// Update skill metrics based on quiz attempt
const updateSkillMetrics = async (userId, subjectId, quizAttempt) => {
  try {
    let userProgress = await UserProgress.findOne({
      user: userId,
      subject: subjectId,
    });

    if (!userProgress) {
      userProgress = new UserProgress({
        user: userId,
        subject: subjectId,
        skillMetrics: {
          difficultyHandling: {
            easy: 0,
            medium: 0,
            hard: 0,
          },
        },
      });
    }

    // Update accuracy
    const totalAccuracy =
      userProgress.skillMetrics.accuracy *
      (userProgress.quizAttempts.length || 0);
    userProgress.skillMetrics.accuracy =
      (totalAccuracy + quizAttempt.accuracy) /
      ((userProgress.quizAttempts.length || 0) + 1);

    // Update speed (questions per minute)
    const speed = quizAttempt.totalQuestions / (quizAttempt.timeTaken / 60);
    userProgress.skillMetrics.speed = speed;

    // Update consistency (variation in scores)
    userProgress.quizAttempts.push({
      quiz: quizAttempt.quiz,
      attempt: quizAttempt._id,
      score: quizAttempt.accuracy,
      completedAt: quizAttempt.completedAt,
    });

    // Calculate consistency (standard deviation of recent scores)
    const recentScores = userProgress.quizAttempts
      .slice(-5)
      .map((a) => a.score);

    if (recentScores.length >= 2) {
      const mean =
        recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
      const variance =
        recentScores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
        recentScores.length;
      userProgress.skillMetrics.consistency = 100 - Math.sqrt(variance);
    }

    // Update difficulty handling
    const difficulty =
      quizAttempt.level <= 5
        ? "easy"
        : quizAttempt.level <= 10
        ? "medium"
        : "hard";

    const current =
      userProgress.skillMetrics.difficultyHandling[difficulty] || 0;
    userProgress.skillMetrics.difficultyHandling[difficulty] =
      current * 0.7 + quizAttempt.accuracy * 0.3; // Weighted average

    userProgress.lastUpdated = new Date();
    await userProgress.save();

    return userProgress;
  } catch (error) {
    console.error("Error updating skill metrics:", error);
  }
};

// Recommend next lessons based on performance
const recommendLessons = async (userId, subjectId) => {
  try {
    const userProgress = await UserProgress.findOne({
      user: userId,
      subject: subjectId,
    });

    if (!userProgress) return { level: 1, focusAreas: ["Fundamentals"] };

    const { skillMetrics } = userProgress;

    let recommendedLevel = userProgress.currentLevel;
    const focusAreas = [];

    // Adjust based on metrics
    if (skillMetrics.accuracy < 70) {
      recommendedLevel = Math.max(1, userProgress.currentLevel - 1);
      focusAreas.push("Concept Reinforcement");
    }

    if (skillMetrics.speed < 2) {
      // Less than 2 questions per minute
      focusAreas.push("Time Management");
    }

    if (skillMetrics.consistency < 70) {
      focusAreas.push("Consistency Improvement");
    }

    // Check difficulty handling
    const { difficultyHandling } = skillMetrics;
    if (difficultyHandling.hard < 60) {
      focusAreas.push("Advanced Problem Solving");
    } else if (difficultyHandling.medium < 70) {
      recommendedLevel = Math.min(15, recommendedLevel + 1);
    }

    return {
      level: Math.max(1, Math.min(15, recommendedLevel)),
      focusAreas:
        focusAreas.length > 0 ? focusAreas : ["Continue Current Level"],
    };
  } catch (error) {
    console.error("Error recommending lessons:", error);
    return { level: 1, focusAreas: ["Fundamentals"] };
  }
};

module.exports = {
  calculateSkillLevel,
  updateSkillMetrics,
  recommendLessons,
};
