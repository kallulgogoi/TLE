import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Star,
  PlayCircle,
  CheckCircle,
  Lock,
  ArrowLeft,
  ArrowUp,
  Activity,
  Loader2,
  Clock,
  Target,
} from "lucide-react";
import toast from "react-hot-toast";

const SubjectDashboard = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [subjectData, setSubjectData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [userProgress, setUserProgress] = useState({
    currentLevel: 1,
    totalQuizzes: 0,
    accuracy: 0,
    completedLessons: [],
  });

  useEffect(() => {
    fetchData();
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [subjectId]);

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/subjects/${subjectId}`);
      setSubjectData(data);
      setLessons(data.lessons || []);
      if (data.userProgress) {
        const prog = data.userProgress;
        setUserProgress({
          currentLevel: prog.currentLevel || 1,
          totalQuizzes: prog.totalQuizzes || 0,
          accuracy: prog.accuracy || 0,
          completedLessons: prog.completedLessons || [],
        });
        setRating(prog.skillLevel || 1);
        setIsLocked(prog.hasSetRating);
      }
    } catch (error) {
      toast.error("Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRating = async () => {
    if (rating < 1 || rating > 10) {
      toast.error("Rating must be between 1 and 10");
      return;
    }
    try {
      setIsUpdating(true);
      await api.post("/users/subject/rating", {
        subjectId,
        rating: parseInt(rating),
      });
      setIsLocked(true);
      toast.success("Rating confirmed. Mission path unlocked.");
      await fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving rating");
    } finally {
      setIsUpdating(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );

  if (!subjectData)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-500 text-xl">
        Subject not found
      </div>
    );

  const percentage = Math.min(
    100,
    Math.round((userProgress.completedLessons.length / lessons.length) * 100) ||
      0
  );

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-sm mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Header - Mobile Friendly */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center text-3xl font-black text-black flex-shrink-0">
              {subjectData.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {subjectData.name}
              </h1>
              <div className="flex items-center gap-3 text-lg">
                <span className="text-gray-400">Level</span>
                <span className="text-orange-500 font-black text-3xl">
                  {userProgress.currentLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Stacked on Mobile */}
        <div className="space-y-6 mb-10">
          {/* Baseline Rating Card */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500" />
                Baseline Rating
              </h3>
              {isLocked && <Lock className="w-5 h-5 text-gray-600" />}
            </div>

            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              disabled={isLocked}
              onChange={(e) => {
                const val = parseInt(e.target.value) || "";
                if (val === "" || (val >= 1 && val <= 10)) setRating(val);
              }}
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-center text-4xl font-bold text-orange-500 focus:border-orange-500 outline-none transition mb-4"
            />

            {!isLocked && (
              <button
                onClick={handleSaveRating}
                disabled={isUpdating}
                className="w-full bg-orange-600 hover:bg-orange-500 text-black font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 text-lg"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Target className="w-5 h-5" />
                )}
                {isUpdating ? "Saving..." : "Confirm Rating"}
              </button>
            )}

            {isLocked && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Rating locked — lessons now accessible
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400">Progress</span>
              <span className="text-2xl font-bold text-orange-500">
                {percentage}%
              </span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Stats Grid - 1 or 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
              <Activity className="w-9 h-9 text-orange-500 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Quizzes Taken</p>
              <p className="text-3xl font-bold text-white mt-2">
                {userProgress.totalQuizzes}
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
              <Target className="w-9 h-9 text-green-500 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Accuracy</p>
              <p
                className={`text-3xl font-bold mt-2 ${
                  userProgress.accuracy >= 70
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {Math.round(userProgress.accuracy)}%
              </p>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Lessons</h2>
              <span className="text-gray-400 text-sm">
                {userProgress.completedLessons.length} / {lessons.length}{" "}
                completed
              </span>
            </div>
          </div>

          <div>
            {lessons.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                No lessons available yet.
              </div>
            ) : (
              lessons.map((lesson, index) => {
                const isCompleted = userProgress.completedLessons.includes(
                  lesson._id
                );
                const isSequenceLocked =
                  !isCompleted &&
                  index > 0 &&
                  !userProgress.completedLessons.includes(
                    lessons[index - 1]._id
                  );
                const isLockedLesson = !isLocked || isSequenceLocked;

                return (
                  <div
                    key={lesson._id}
                    onClick={() => {
                      if (!isLocked) {
                        toast.error(
                          "Confirm baseline rating to access lessons"
                        );
                        return;
                      }
                      if (!isLockedLesson) navigate(`/lesson/${lesson._id}`);
                    }}
                    className={`px-6 py-5 flex items-center justify-between border-b border-gray-800 transition-colors ${
                      isLockedLesson
                        ? "opacity-50"
                        : "hover:bg-gray-800 cursor-pointer"
                    } last:border-b-0`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border-2 flex-shrink-0 ${
                          isCompleted
                            ? "border-green-600 text-green-600 bg-green-600/10"
                            : "border-orange-600 text-orange-600 bg-orange-600/10"
                        }`}
                      >
                        {isCompleted ? <CheckCircle size={28} /> : lesson.level}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white truncate">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                          <Clock size={14} />
                          <span>{lesson.estimatedTime || 15} min</span>
                        </p>
                      </div>
                    </div>

                    {isLockedLesson ? (
                      <Lock className="w-6 h-6 text-gray-600 flex-shrink-0" />
                    ) : (
                      <PlayCircle className="w-8 h-8 text-orange-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-500 text-black p-4 rounded-full shadow-2xl transition z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default SubjectDashboard;
