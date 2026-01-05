const Lesson = require("../models/Lesson");
const Subject = require("../models/Subject");

// Get all lessons for a subject
const getLessonsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { level } = req.query;

    const query = { subject: subjectId };
    if (level) query.level = level;

    const lessons = await Lesson.find(query)
      .populate("quiz", "title timeLimit questions")
      .populate("prerequisites", "title level")
      .sort("level");

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single lesson
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate("quiz", "title timeLimit questions")
      .populate("prerequisites", "title level")
      .populate("subject", "name icon");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create lesson (Admin)
const createLesson = async (req, res) => {
  try {
    const {
      subject,
      level,
      title,
      content,
      videoUrl,
      examples,
      prerequisites,
      estimatedTime,
      ratingGroup,
    } = req.body;

    const lesson = new Lesson({
      subject,
      level,
      title,
      content,
      videoUrl,
      examples,
      prerequisites,
      estimatedTime,
      ratingGroup,
    });

    await lesson.save();
    await Subject.findByIdAndUpdate(subject, {
      $push: { lessons: lesson._id },
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lesson (Admin)
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const markLessonCompleted = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const user = req.user;
    const subject = user.subjects.find(
      (s) => s.subjectId.toString() === lesson.subject.toString()
    );

    if (subject && !subject.completedLessons.includes(lessonId)) {
      subject.completedLessons.push(lessonId);
      await user.save();
    }

    res.json({ message: "Lesson marked as completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLessonsBySubject,
  getLessonById,
  createLesson,
  updateLesson,
  markLessonCompleted,
};
