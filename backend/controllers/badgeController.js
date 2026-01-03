const Badge = require("../models/Badge");
const User = require("../models/User");

// Get all badges
const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find({ isActive: true }).sort({ threshold: 1 });
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's badges
const getUserBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "badges",
      "name description icon rarity pointsReward"
    );

    res.json({
      totalBadges: user.badges.length,
      badges: user.badges,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get badge by ID
const getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);

    if (!badge) {
      return res.status(404).json({ message: "Badge not found" });
    }

    // Check if user has earned this badge
    const user = await User.findById(req.user.id);
    const hasBadge = user.badges.includes(badge._id);

    res.json({
      badge,
      earned: hasBadge,
      progress: await getBadgeProgress(req.user.id, badge),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to get badge progress
const getBadgeProgress = async (userId, badge) => {
  const user = await User.findById(userId);

  switch (badge.criteria) {
    case "points":
      return {
        current: user.points,
        target: badge.threshold,
        percentage: Math.min(100, (user.points / badge.threshold) * 100),
      };

    case "streak":
      return {
        current: user.streak.current,
        target: badge.threshold,
        percentage: Math.min(
          100,
          (user.streak.current / badge.threshold) * 100
        ),
      };

    case "subject_completion":
      const completedSubjects = user.subjects.filter(
        (s) => s.isCompleted
      ).length;
      return {
        current: completedSubjects,
        target: badge.threshold,
        percentage: Math.min(100, (completedSubjects / badge.threshold) * 100),
      };

    case "accuracy":
      const avgAccuracy =
        user.subjects.length > 0
          ? user.subjects.reduce((acc, curr) => acc + curr.accuracy, 0) /
            user.subjects.length
          : 0;
      return {
        current: avgAccuracy,
        target: badge.threshold,
        percentage: Math.min(100, (avgAccuracy / badge.threshold) * 100),
      };

    case "quizzes_taken":
      const totalQuizzes = user.subjects.reduce(
        (acc, curr) => acc + curr.totalQuizzes,
        0
      );
      return {
        current: totalQuizzes,
        target: badge.threshold,
        percentage: Math.min(100, (totalQuizzes / badge.threshold) * 100),
      };

    default:
      return { current: 0, target: 0, percentage: 0 };
  }
};

// Get badges progress for user
const getBadgesProgress = async (req, res) => {
  try {
    // 1. Get all active badges sorted by difficulty
    const badges = await Badge.find({ isActive: true }).sort({ threshold: 1 });

    // 2. Calculate progress for THIS specific user
    const progressData = [];
    for (const badge of badges) {
      const progress = await getBadgeProgress(req.user.id, badge);

      progressData.push({
        badge, // Contains name, icon, threshold
        progress, // Contains current, target, percentage
        earned: progress.percentage >= 100, // Boolean flag for frontend lock/unlock
      });
    }

    res.json(progressData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create badge (Admin)
const createBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update badge (Admin)
const updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!badge) {
      return res.status(404).json({ message: "Badge not found" });
    }

    res.json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBadges,
  getUserBadges,
  getBadgeById,
  getBadgesProgress,
  createBadge,
  updateBadge,
};
