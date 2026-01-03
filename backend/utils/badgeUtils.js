const User = require("../models/User");
const Badge = require("../models/Badge");

// Check and award badges based on user achievements
const checkAndAwardBadges = async (user) => {
  try {
    const badges = await Badge.find({ isActive: true });
    const awardedBadges = [];

    for (const badge of badges) {
      let shouldAward = false;

      switch (badge.criteria) {
        case "points":
          shouldAward = user.points >= badge.threshold;
          break;

        case "streak":
          shouldAward = user.streak.current >= badge.threshold;
          break;

        case "subject_completion":
          const completedSubjects = user.subjects.filter(
            (s) => s.isCompleted
          ).length;
          shouldAward = completedSubjects >= badge.threshold;
          break;

        case "accuracy":
          const avgAccuracy =
            user.subjects.length > 0
              ? user.subjects.reduce((acc, curr) => acc + curr.accuracy, 0) /
                user.subjects.length
              : 0;
          shouldAward = avgAccuracy >= badge.threshold;
          break;

        case "quizzes_taken":
          const totalQuizzes = user.subjects.reduce(
            (acc, curr) => acc + curr.totalQuizzes,
            0
          );
          shouldAward = totalQuizzes >= badge.threshold;
          break;
      }

      if (shouldAward && !user.badges.includes(badge._id)) {
        user.badges.push(badge._id);
        user.points += badge.pointsReward;
        awardedBadges.push(badge);
      }
    }

    if (awardedBadges.length > 0) {
      await user.save();
      return awardedBadges;
    }

    return [];
  } catch (error) {
    console.error("Error checking badges:", error);
    return [];
  }
};

// Get user's badges with details
const getUserBadges = async (userId) => {
  try {
    const user = await User.findById(userId).populate("badges");
    return user.badges;
  } catch (error) {
    console.error("Error getting user badges:", error);
    return [];
  }
};

// Create default badges (UPDATED ICONS TO MATCH FRONTEND MAP)
const createDefaultBadges = async () => {
  const defaultBadges = [
    {
      name: "First Steps",
      description: "Complete your first quiz",
      icon: "target", // Maps to Target icon
      criteria: "quizzes_taken",
      threshold: 1,
      rarity: "common",
      pointsReward: 50,
    },
    {
      name: "Quick Learner",
      description: "Achieve 90% accuracy in a quiz",
      icon: "zap", // Maps to Zap icon
      criteria: "accuracy",
      threshold: 90,
      rarity: "rare",
      pointsReward: 100,
    },
    {
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "flame", // Maps to Flame icon
      criteria: "streak",
      threshold: 7,
      rarity: "common",
      pointsReward: 150,
    },
    {
      name: "Master of One",
      description: "Complete one subject",
      icon: "shield", // Maps to Shield icon
      criteria: "subject_completion",
      threshold: 1,
      rarity: "rare",
      pointsReward: 200,
    },
    {
      name: "Point Collector",
      description: "Earn 10,000 points",
      icon: "star", // Maps to Star icon
      criteria: "points",
      threshold: 10000,
      rarity: "epic",
      pointsReward: 500,
    },
    {
      name: "Consistency King",
      description: "Maintain a 30-day streak",
      icon: "trophy", // Maps to Trophy icon
      criteria: "streak",
      threshold: 30,
      rarity: "legendary",
      pointsReward: 1000,
    },
  ];

  for (const badgeData of defaultBadges) {
    await Badge.findOneAndUpdate({ name: badgeData.name }, badgeData, {
      upsert: true,
      new: true,
    });
  }
  console.log("✅ Badges synchronized");
};

module.exports = {
  checkAndAwardBadges,
  getUserBadges,
  createDefaultBadges,
};
