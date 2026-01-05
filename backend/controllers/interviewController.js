const Interview = require("../models/Interview");

// Get Interview Details (Attempt or Review)
const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Interview ID" });
    }

    const interview = await Interview.findById(id)
      .populate("subject", "name icon")
      .populate("user", "name");

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // Security check: Ensure the requesting user owns this interview
    if (interview.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(interview);
  } catch (error) {
    console.error("Get Interview Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Submit MCQ Interview Answers
const submitInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    /** * Expects answers as:
     * [{ questionId: "...", selectedOption: number }]
     */

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.status === "completed") {
      return res.status(400).json({ message: "Interview already submitted" });
    }

    // Process and Grade MCQ Answers
    const gradedAnswers = answers
      .map((ans) => {
        // Find the specific question inside the interview document
        const question = interview.questions.id(ans.questionId);

        if (!question) return null;

        // Check if user's selection matches the correct answer index
        const isCorrect = ans.selectedOption === question.correctAnswer;

        return {
          questionId: ans.questionId,
          selectedOption: ans.selectedOption,
          isCorrect: isCorrect,
          // We set score as 1 for correct, 0 for incorrect for analytics later
          score: isCorrect ? 1 : 0,
        };
      })
      .filter(Boolean); // Remove any nulls if question IDs didn't match

    // Update Interview Document
    interview.answers = gradedAnswers;
    interview.status = "completed";
    interview.completedAt = new Date();

    await interview.save();

    res.json({
      message: "Interview evaluation finalized",
      interviewId: interview._id,
      score: gradedAnswers.filter((a) => a.isCorrect).length,
      total: interview.questions.length,
    });
  } catch (error) {
    console.error("Submit Interview Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInterviewById,
  submitInterview,
};
