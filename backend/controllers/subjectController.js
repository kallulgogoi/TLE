const Subject = require("../models/Subject");
const Lesson = require("../models/Lesson");
const User = require("../models/User");

// Get All Subjects (List View)
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .select("name description icon totalLevels")
      .lean();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSubjectById = async (req, res) => {
  try {
    const userId = req.user.id;
    const subjectId = req.params.id;
    const user = await User.findById(userId).select("subjects").lean();

    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Find the enrollment entry for this subject
    const userSubject = user.subjects.find(
      (s) => s.subjectId.toString() === subjectId
    );
    const userRating = userSubject ? parseInt(userSubject.skillLevel || 1) : 1;

    console.log(
      `[DEBUG] Fetching Subject ${subjectId} for User Rating: ${userRating}`
    );
    const subject = await Subject.findById(subjectId)
      .populate({
        path: "lessons",
        select: "title level estimatedTime ratingGroup videoUrl",
        options: { sort: { level: 1 } },
      })
      .lean();

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const filteredLessons = subject.lessons.filter((lesson) => {
      if (lesson.level > 1) return true;
      if (lesson.level === 1) {
        return lesson.ratingGroup === userRating;
      }
      return false;
    });
    res.json({
      ...subject,
      lessons: filteredLessons,
      userProgress: userSubject || null,
    });
  } catch (error) {
    console.error("Subject Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create Subject (Admin Only)
const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Placeholder for future use
const generateLessons = async (req, res) => {
  try {
    res.json({
      message: "Lessons generation is handled adaptively via quizzes.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  generateLessons,
};
