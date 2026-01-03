const QUESTION_BANK = require("../data/questionBank");

/**
 * Selects random questions from the bank based on difficulty.
 * @param {string} subjectName - "DSA", "OS", "CN"
 * @param {string} difficulty - "easy", "medium", "hard"
 * @param {number} count - Number of questions to fetch (e.g., 10)
 */
const getAdaptiveQuestions = (subjectName, difficulty, count = 10) => {
  const subjectKey = Object.keys(QUESTION_BANK).find(
    (k) => k.toLowerCase() === subjectName.toLowerCase()
  );

  const subjectQuestions = QUESTION_BANK[subjectKey];

  if (!subjectQuestions) {
    console.error(`Subject ${subjectName} not found in Question Bank.`);
    return [];
  }

  // Filter by difficulty
  let filteredPool = subjectQuestions.filter(
    (q) => q.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
  if (filteredPool.length < count) {
    filteredPool = subjectQuestions;
  }
  const shuffled = [...filteredPool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

/**
 * Analyzes the user's answers to find weak topics.
 * @param {Array} detailedAnswers - Array of answer objects
 */
const analyzeWeakAreas = (detailedAnswers) => {
  const topicStats = {};

  detailedAnswers.forEach((ans) => {
    if (!ans.topic) return;

    if (!topicStats[ans.topic]) {
      topicStats[ans.topic] = { total: 0, correct: 0 };
    }
    topicStats[ans.topic].total++;
    if (ans.isCorrect) topicStats[ans.topic].correct++;
  });

  // Identify topics with < 50% accuracy
  const weakTopics = [];
  for (const [topic, stats] of Object.entries(topicStats)) {
    const accuracy = (stats.correct / stats.total) * 100;
    if (accuracy < 50) {
      weakTopics.push(topic);
    }
  }

  return weakTopics;
};

module.exports = { getAdaptiveQuestions, analyzeWeakAreas };
