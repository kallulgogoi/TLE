const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User");
const Lesson = require("../models/Lesson");
const Subject = require("../models/Subject");
const UserProgress = require("../models/UserProgress");
const Interview = require("../models/Interview");
const {
  getAdaptiveQuestions,
  analyzeWeakAreas,
} = require("../utils/adaptiveEngine");
const { calculatePoints } = require("../utils/pointSystem");
const { updateSkillMetrics } = require("../utils/mlUtils");
const { checkAndAwardBadges } = require("../utils/badgeUtils");
const { predictUserSkill } = require("../utils/mlIntegration"); // ML Service
const { generateInterview } = require("../utils/geminiAPI"); // Gemini Interview

// --- START QUIZ ---
const startQuiz = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const quiz = await Quiz.findOne({ lesson: lessonId }).select(
      "-questions.options.isCorrect"
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // In Quiz-Only mode, we skip checking 'theoryCompletedLessons'

    res.json({
      quizId: quiz._id,
      title: quiz.title,
      questions: quiz.questions,
      timeLimit: quiz.timeLimit,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, timeTaken } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const lessonDoc = await Lesson.findById(quiz.lesson);
    const subject = await Subject.findById(lessonDoc.subject);
    let correctAnswersCount = 0;

    const detailedAnswers = answers
      .map((ans, index) => {
        const question = quiz.questions[index];
        if (!question) return null;

        const selectedOptIndex = ans.selectedOption;
        let isCorrect = false;
        if (
          selectedOptIndex >= 0 &&
          selectedOptIndex < question.options.length
        ) {
          isCorrect = question.options[selectedOptIndex].isCorrect;
        }
        if (isCorrect) correctAnswersCount++;

        return {
          questionId: question._id,
          selectedOption: selectedOptIndex,
          isCorrect: isCorrect,
          topic: question.topic,
          difficulty: question.difficulty,
          timeTaken: 0,
        };
      })
      .filter(Boolean);

    const score = (correctAnswersCount / quiz.questions.length) * 100;
    const isPassed = score >= (quiz.passingScore || 50);
    const weakTopics = analyzeWeakAreas(detailedAnswers);
    let nextDifficulty = "medium";
    let performanceMetric = "Stable";

    if (score >= 80) {
      nextDifficulty = "hard";
      performanceMetric = "Excellent";
    } else if (score < 50) {
      nextDifficulty = "easy";
      performanceMetric = "Needs Improvement";
    }

    let pointsEarned = calculatePoints(score, timeTaken, quiz.questions.length);
    const user = await User.findById(req.user.id);

    // Find subject progress within the user document
    const subjectProgress = user.subjects.find(
      (s) => s.subjectId.toString() === lessonDoc.subject.toString()
    );

    if (
      subjectProgress &&
      subjectProgress.completedLessons.includes(lessonDoc._id)
    ) {
      pointsEarned = 0;
    }

    user.points += pointsEarned;
    await user.updateStreak();

    let nextLessonId = null;
    let interviewId = null;
    let generatedMsg = "";

    // 1. IMPROVED ACCURACY CALCULATION (Weighted Average)
    if (subjectProgress && isPassed) {
      const prevCount = subjectProgress.completedLessons.length;
      if (!subjectProgress.completedLessons.includes(lessonDoc._id)) {
        subjectProgress.completedLessons.push(lessonDoc._id);
        // Weighted average formula: ((Old Avg * Old Count) + New Score) / New Count
        subjectProgress.accuracy =
          (subjectProgress.accuracy * prevCount + score) / (prevCount + 1);
      }
    }

    const nextLevel = lessonDoc.level + 1;
    const MAX_LEVEL = 10;

    if (isPassed && lessonDoc.level >= MAX_LEVEL) {
      console.log("Subject Completed! Initiating Final Evaluation...");
      const allAttempts = await QuizAttempt.find({
        user: req.user.id,
        subject: lessonDoc.subject,
      });

      const totalQuizzes = allAttempts.length + 1;
      const sumScores =
        allAttempts.reduce((acc, curr) => acc + curr.score, 0) + score;
      const avgAccuracy = sumScores / totalQuizzes / 100;

      const sumTime =
        allAttempts.reduce((acc, curr) => acc + curr.timeTaken, 0) + timeTaken;
      const avgTime = sumTime / totalQuizzes;

      const uniquePassed = new Set(
        allAttempts.filter((a) => a.isPassed).map((a) => a.lesson.toString())
      ).size;

      const retryRate =
        uniquePassed > 0
          ? (totalQuizzes - (isPassed ? uniquePassed + 1 : uniquePassed)) /
            totalQuizzes
          : 0;

      const mlInput = {
        avg_accuracy: avgAccuracy,
        avg_time: avgTime,
        max_difficulty: 3,
        retry_rate: Math.max(0, retryRate),
        quizzes_attempted: totalQuizzes,
      };

      const prediction = await predictUserSkill(mlInput);
      const predictedSkill = prediction.skill_level || "Intermediate";

      const interviewQuestions = await generateInterview(
        subject.name,
        predictedSkill
      );

      if (interviewQuestions.length > 0) {
        const newInterview = new Interview({
          user: req.user.id,
          subject: subject._id,
          title: `Final Assessment: ${predictedSkill} Level`,
          questions: interviewQuestions,
          skillLevel: 5,
          status: "pending",
        });

        await newInterview.save();
        interviewId = newInterview._id;
        generatedMsg = `Course Completed! ${predictedSkill} Interview Generated.`;
        if (subjectProgress) subjectProgress.isCompleted = true;
      }
    } else if (isPassed && nextLevel <= MAX_LEVEL) {
      const existingNextLesson = await Lesson.findOne({
        subject: subject._id,
        level: nextLevel,
      });

      if (existingNextLesson) {
        nextLessonId = existingNextLesson._id;
        generatedMsg = "Next level unlocked!";
        if (subjectProgress && subjectProgress.currentLevel < nextLevel) {
          subjectProgress.currentLevel = nextLevel;
        }
      } else {
        const rawQuestions = getAdaptiveQuestions(
          subject.name,
          nextDifficulty,
          10
        );
        const newQuestions = rawQuestions.map((q) => ({
          question: q.question,
          options: q.options,
          difficulty: q.difficulty,
          explanation: q.explanation,
          topic: q.topic,
          points: q.points || 10,
        }));

        if (newQuestions.length > 0) {
          const weakTopicText =
            weakTopics.length > 0
              ? `### ⚠️ Detected Weak Zones:\n${weakTopics.map((t) => `- **${t}**`).join("\n")}\n\n*Focus on these topics in the next simulation.*`
              : `### Performance Analysis\nNo specific weak zones detected. You are ready for advanced protocols.`;

          const newLesson = new Lesson({
            subject: subject._id,
            level: nextLevel,
            title: `Level ${nextLevel}: ${nextDifficulty.toUpperCase()} Protocol`,
            content: `## Mission Report (Level ${lessonDoc.level})\n\n**Status:** ${performanceMetric}\n**Score:** ${Math.round(score)}%\n\n${weakTopicText}\n\n---\n\n### Next Objective\nComplete the Level ${nextLevel} assessment.`,
            estimatedTime: 10,
          });
          await newLesson.save();

          const newQuiz = new Quiz({
            lesson: newLesson._id,
            title: `Assessment: Level ${nextLevel}`,
            questions: newQuestions,
            timeLimit: 600,
            passingScore: 50,
          });
          await newQuiz.save();

          newLesson.quiz = newQuiz._id;
          await newLesson.save();

          subject.lessons.push(newLesson._id);
          await subject.save();

          nextLessonId = newLesson._id;
          generatedMsg = `Level ${nextLevel} Generated`;

          if (subjectProgress && subjectProgress.currentLevel < nextLevel) {
            subjectProgress.currentLevel = nextLevel;
          }
        }
      }
    }

    await user.save();

    // 2. CREATE QUIZ ATTEMPT
    const quizAttempt = new QuizAttempt({
      user: user._id,
      quiz: quizId,
      lesson: lessonDoc._id,
      subject: lessonDoc.subject,
      answers: detailedAnswers,
      score: score,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctAnswersCount,
      accuracy: score,
      timeTaken: timeTaken,
      pointsEarned: pointsEarned,
      level: lessonDoc.level,
      isPassed: isPassed,
    });
    await quizAttempt.save();

    // 3. UPDATE USER PROGRESS (Incrementing Total Attempts)
    await UserProgress.findOneAndUpdate(
      { user: req.user.id, subject: lessonDoc.subject },
      {
        $set: { currentLevel: subjectProgress?.currentLevel || 1 },
        $inc: { totalAttempts: 1 }, // This ensures the dashboard sees the quiz taken
        $addToSet: {
          completedLessons: isPassed
            ? {
                lesson: lessonDoc._id,
                completedAt: new Date(),
                quizScore: score,
              }
            : undefined,
        },
      },
      { upsert: true }
    );

    checkAndAwardBadges(user).catch((err) => console.error(err));
    updateSkillMetrics(req.user.id, lessonDoc.subject, quizAttempt).catch(
      (err) => console.error(err)
    );

    res.json({
      message: "Quiz Submitted",
      result: {
        quizAttemptId: quizAttempt._id,
        score,
        pointsEarned,
        isPassed,
        nextLessonId,
        interviewId,
        generatedInfo: generatedMsg,
        weakTopics,
        nextDifficulty,
      },
    });
  } catch (error) {
    console.error("Submit Quiz Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getQuizResults = async (req, res) => {
  try {
    const { quizAttemptId } = req.params;
    const quizAttempt = await QuizAttempt.findById(quizAttemptId)
      .populate("quiz")
      .populate("lesson", "title level")
      .populate("subject", "name");

    if (!quizAttempt)
      return res.status(404).json({ message: "Result not found" });
    if (quizAttempt.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const quiz = await Quiz.findById(quizAttempt.quiz);

    const detailedResults = quizAttempt.answers
      .map((ans, idx) => {
        const question =
          quiz.questions.find(
            (q) => q._id.toString() === ans.questionId?.toString()
          ) || quiz.questions[idx];
        if (!question) return null;

        return {
          question: question.question,
          options: question.options.map((o) => o.text),
          selectedOption: ans.selectedOption,
          correctOption: question.options.findIndex((o) => o.isCorrect),
          isCorrect: ans.isCorrect,
          explanation: question.explanation,
          topic: question.topic,
        };
      })
      .filter(Boolean);

    res.json({ quizAttempt, detailedResults });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuizHistory = async (req, res) => {
  try {
    const { subjectId, limit = 20, page = 1 } = req.query;
    let query = { user: req.user.id };
    if (subjectId) query.subject = subjectId;

    const quizAttempts = await QuizAttempt.find(query)
      .populate("lesson", "title level")
      .populate("subject", "name")
      .sort({ completedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await QuizAttempt.countDocuments(query);
    res.json({
      quizAttempts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  startQuiz,
  submitQuiz,
  getQuizResults,
  getQuizHistory,
};
