const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User");
const UserProgress = require("../models/UserProgress");
const { recommendLessons } = require("../utils/mlUtils");

// Analyze user performance
const analyzePerformance = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // Get recent quiz attempts
    const recentAttempts = await QuizAttempt.find({
      user: req.user.id,
      subject: subjectId,
    })
      .sort({ completedAt: -1 })
      .limit(20);

    if (recentAttempts.length === 0) {
      return res.status(404).json({ message: "No quiz attempts found" });
    }

    // Calculate performance metrics
    const metrics = calculatePerformanceMetrics(recentAttempts);

    // Get skill gaps
    const skillGaps = identifySkillGaps(recentAttempts);

    // Get recommendations
    const recommendations = await recommendLessons(req.user.id, subjectId);

    res.json({
      metrics,
      skillGaps,
      recommendations,
      recentPerformance: recentAttempts.map((attempt) => ({
        date: attempt.completedAt,
        score: attempt.accuracy,
        level: attempt.level,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculate performance metrics
const calculatePerformanceMetrics = (attempts) => {
  const totalAttempts = attempts.length;
  const totalCorrect = attempts.reduce((sum, a) => sum + a.correctAnswers, 0);
  const totalQuestions = attempts.reduce((sum, a) => sum + a.totalQuestions, 0);

  const accuracy =
    totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  // Calculate average time per question
  const totalTime = attempts.reduce((sum, a) => sum + a.timeTaken, 0);
  const avgTimePerQuestion =
    totalQuestions > 0 ? totalTime / totalQuestions : 0;

  // Calculate consistency (standard deviation of scores)
  const scores = attempts.map((a) => a.accuracy);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance =
    scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
  const consistency = 100 - Math.sqrt(variance);

  // Calculate difficulty progression
  const levels = attempts.map((a) => a.level);
  const maxLevel = Math.max(...levels);
  const minLevel = Math.min(...levels);
  const levelProgression = maxLevel - minLevel;

  return {
    accuracy,
    avgTimePerQuestion,
    consistency,
    levelProgression,
    totalAttempts,
    improvementRate: calculateImprovementRate(attempts),
  };
};

// Calculate improvement rate
const calculateImprovementRate = (attempts) => {
  if (attempts.length < 2) return 0;

  const recent = attempts.slice(0, 3);
  const older = attempts.slice(-3);

  const recentAvg =
    recent.reduce((sum, a) => sum + a.accuracy, 0) / recent.length;
  const olderAvg = older.reduce((sum, a) => sum + a.accuracy, 0) / older.length;

  return olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;
};

// Identify skill gaps
const identifySkillGaps = (attempts) => {
  const skillGaps = [];

  // Analyze incorrect answers by topic (if topic data is available)
  const incorrectByTopic = {};

  attempts.forEach((attempt) => {
    attempt.answers.forEach((answer) => {
      if (!answer.isCorrect) {
        // You would need to store topic with each question
        // For now, using level as proxy for difficulty
        const topic = `Level ${attempt.level}`;
        incorrectByTopic[topic] = (incorrectByTopic[topic] || 0) + 1;
      }
    });
  });

  // Convert to array and sort
  const gaps = Object.entries(incorrectByTopic)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3); // Top 3 skill gaps

  return gaps;
};

// Predict interview readiness
const predictInterviewReadiness = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const user = await User.findById(req.user.id);
    const userSubject = user.subjects.find(
      (s) => s.subjectId.toString() === subjectId
    );

    if (!userSubject) {
      return res.status(404).json({ message: "Subject not found for user" });
    }

    const quizAttempts = await QuizAttempt.find({
      user: req.user.id,
      subject: subjectId,
    })
      .sort({ completedAt: -1 })
      .limit(10);

    if (quizAttempts.length === 0) {
      return res.json({
        readiness: 0,
        confidence: 0,
        areasToImprove: ["Start with basic quizzes"],
        estimatedPreparationTime: "4-6 weeks",
      });
    }

    // Calculate readiness score (0-100)
    const readinessScore = calculateReadinessScore(quizAttempts, userSubject);

    // Determine readiness level
    let readinessLevel, confidence, areasToImprove, estimatedPreparationTime;

    if (readinessScore >= 80) {
      readinessLevel = "Excellent";
      confidence = "High";
      areasToImprove = ["Mock interviews", "Advanced system design"];
      estimatedPreparationTime = "1-2 weeks";
    } else if (readinessScore >= 60) {
      readinessLevel = "Good";
      confidence = "Medium";
      areasToImprove = ["Complex problem solving", "Time management"];
      estimatedPreparationTime = "2-3 weeks";
    } else if (readinessScore >= 40) {
      readinessLevel = "Fair";
      confidence = "Low";
      areasToImprove = ["Core concepts", "Basic problem solving"];
      estimatedPreparationTime = "3-4 weeks";
    } else {
      readinessLevel = "Needs Work";
      confidence = "Very Low";
      areasToImprove = ["Fundamentals", "Basic concepts"];
      estimatedPreparationTime = "4-6 weeks";
    }

    res.json({
      readinessScore,
      readinessLevel,
      confidence,
      areasToImprove,
      estimatedPreparationTime,
      recentAccuracy: userSubject.accuracy,
      completedLessons: userSubject.completedLessons.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculate readiness score
const calculateReadinessScore = (quizAttempts, userSubject) => {
  // Weighted factors
  const weights = {
    accuracy: 0.4,
    consistency: 0.2,
    difficultyHandling: 0.2,
    lessonCompletion: 0.1,
    recentPerformance: 0.1,
  };

  // Calculate accuracy score
  const accuracyScore = userSubject.accuracy;

  // Calculate consistency (less variance = better)
  const recentScores = quizAttempts.slice(0, 5).map((a) => a.accuracy);
  const mean = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  const variance =
    recentScores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
    recentScores.length;
  const consistencyScore = Math.max(0, 100 - Math.sqrt(variance) * 2);

  // Calculate difficulty handling (based on max level attempted)
  const maxLevel = Math.max(...quizAttempts.map((a) => a.level));
  const difficultyScore = (maxLevel / 15) * 100;

  // Calculate lesson completion
  const lessonCompletionScore =
    (userSubject.completedLessons.length / 15) * 100;

  // Calculate recent performance trend
  const recentPerformanceScore = calculateRecentPerformanceTrend(quizAttempts);

  // Weighted sum
  const totalScore =
    accuracyScore * weights.accuracy +
    consistencyScore * weights.consistency +
    difficultyScore * weights.difficultyHandling +
    lessonCompletionScore * weights.lessonCompletion +
    recentPerformanceScore * weights.recentPerformance;

  return Math.min(100, Math.max(0, totalScore));
};
const calculateRecentPerformanceTrend = (quizAttempts) => {
  if (quizAttempts.length < 3) return 50;

  const recent = quizAttempts.slice(0, 3);
  const older = quizAttempts.slice(3, 6);

  if (older.length === 0) return 50;

  const recentAvg =
    recent.reduce((sum, a) => sum + a.accuracy, 0) / recent.length;
  const olderAvg = older.reduce((sum, a) => sum + a.accuracy, 0) / older.length;

  if (olderAvg === 0) return 50;

  const improvement = ((recentAvg - olderAvg) / olderAvg) * 100;

  // Map improvement to score (0-100)
  if (improvement >= 20) return 100;
  if (improvement >= 10) return 75;
  if (improvement >= 0) return 50;
  if (improvement >= -10) return 25;
  return 0;
};

module.exports = {
  analyzePerformance,
  predictInterviewReadiness,
};
