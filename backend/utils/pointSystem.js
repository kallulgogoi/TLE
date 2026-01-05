// Calculate points based on quiz performance
const calculatePoints = (accuracy, timeTaken, totalQuestions) => {
  // Base points for accuracy
  let points = Math.floor(accuracy * 2); // 200 points for 100% accuracy

  // Time bonus (faster = more points)
  const avgTimePerQuestion = timeTaken / totalQuestions;
  let timeBonus = 0;

  if (avgTimePerQuestion < 30) {
    // Less than 30 seconds per question
    timeBonus = 50;
  } else if (avgTimePerQuestion < 60) {
    // Less than 1 minute per question
    timeBonus = 25;
  }

  // Streak bonus (implement if tracking consecutive correct answers)
  const streakBonus = 0; // You can implement streak tracking

  // Difficulty multiplier (implement if tracking question difficulty)
  const difficultyMultiplier = 1.0;

  const totalPoints = (points + timeBonus + streakBonus) * difficultyMultiplier;

  return Math.max(10, Math.floor(totalPoints)); // Minimum 10 points
};

// Calculate user level based on total points
const calculateLevel = (totalPoints) => {
  const levels = [
    0, // Level 1
    1000, // Level 2
    2500, // Level 3
    5000, // Level 4
    10000, // Level 5
    20000, // Level 6
    35000, // Level 7
    50000, // Level 8
    75000, // Level 9
    100000, // Level 10
    150000, // Level 11
    200000, // Level 12
    300000, // Level 13
    500000, // Level 14
    750000, // Level 15
  ];

  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalPoints >= levels[i]) {
      return i + 1;
    }
  }

  return 1;
};

// Calculate streak bonus
const calculateStreakBonus = (currentStreak) => {
  if (currentStreak >= 30) return 100; // 30-day streak
  if (currentStreak >= 14) return 50; // 14-day streak
  if (currentStreak >= 7) return 25; // 7-day streak
  return 0;
};

module.exports = {
  calculatePoints,
  calculateLevel,
  calculateStreakBonus,
};
