const axios = require("axios");
const ML_API_URL = process.env.ML_API_URL;

/**
 * Calls the Python ML service to predict user skill.
 * @param {Object} stats - { avg_accuracy, avg_time, max_difficulty, retry_rate, quizzes_attempted }
 */
const predictUserSkill = async (stats) => {
  try {
    const response = await axios.post(`${ML_API_URL}/predict-skill`, stats);
    console.log("[ML Service] Prediction Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "[ML Service] Connection Failed. Is the Python server running?"
    );
    console.error("Error details:", error.message);
    return {
      skill_level: "Intermediate",
      next_difficulty: "Medium",
      revision_required: false,
      confidence_score: 0.0,
    };
  }
};

module.exports = { predictUserSkill };
