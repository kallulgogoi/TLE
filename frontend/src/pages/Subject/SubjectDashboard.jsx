import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Trophy,
  Target,
  Zap,
  Clock,
  Star,
  PlayCircle,
  CheckCircle,
  Lock,
  Unlock,
  ArrowLeft,
  ArrowUp,
  Activity,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast"; // Import Toast

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

  useEffect(() => {
    fetchData();
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [subjectId]);

  const fetchData = async () => {
    try {
      const { data: subject } = await api.get(`/subjects/${subjectId}`);
      setSubjectData(subject);

      if (subject.userProgress) {
        setRating(subject.userProgress.skillLevel || 1);
        setIsLocked(subject.userProgress.hasSetRating);
      }

      // Backend now correctly filters based on the user rating we just fetched
      const { data: lessonList } = await api.get(
        `/lessons/subject/${subjectId}`
      );
      setLessons(lessonList);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRating = async () => {
    if (rating === "" || rating < 1 || rating > 10) {
      toast.error("Please enter a rating between 1 and 10");
      return;
    }

    try {
      setIsUpdating(true);
      await api.post("/users/subject/rating", {
        subjectId,
        rating: parseInt(rating),
      });

      setIsLocked(true);
      toast.success("Rating confirmed! Adapting curriculum...");

      // RELOAD DATA to get the correct Level 1 questions for this rating
      await fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving rating");
      setIsLocked(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getProficiency = (level) => {
    if (level >= 14)
      return {
        label: "GRANDMASTER",
        color: "text-red-500",
        border: "border-red-500",
        bg: "bg-red-500/10",
      };
    if (level >= 10)
      return {
        label: "MASTER",
        color: "text-orange-500",
        border: "border-orange-500",
        bg: "bg-orange-500/10",
      };
    if (level >= 6)
      return {
        label: "EXPERT",
        color: "text-yellow-400",
        border: "border-yellow-400",
        bg: "bg-yellow-400/10",
      };
    if (level >= 3)
      return {
        label: "APPRENTICE",
        color: "text-blue-400",
        border: "border-blue-400",
        bg: "bg-blue-400/10",
      };
    return {
      label: "NOVICE",
      color: "text-gray-400",
      border: "border-gray-400",
      bg: "bg-gray-400/10",
    };
  };

  if (loading)
    return (
      <div className="p-20 text-center text-gray-500">
        Loading mission data...
      </div>
    );
  if (!subjectData)
    return (
      <div className="p-20 text-center text-gray-500">Subject not found.</div>
    );

  const progress = subjectData.userProgress || {};
  const percentage =
    lessons.length > 0
      ? Math.round(((progress.completedLessons?.length || 0) / 15) * 100)
      : 0;
  const status = getProficiency(progress.currentLevel || 1);

  return (
    <div className="w-full relative">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 flex items-center text-gray-400 hover:text-orange-500 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-gray-900 rounded-3xl p-8 md:p-10 border border-gray-800 shadow-2xl mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg shrink-0 z-10">
          <span className="text-3xl font-black text-black tracking-tighter">
            {subjectData.name.substring(0, 3).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
            <h1 className="text-4xl font-extrabold text-white">
              {subjectData.name}{" "}
              <span className="text-orange-500">Masterclass</span>
            </h1>
            <div
              className={`px-3 py-1 rounded-full border ${status.border} ${status.bg} ${status.color} text-xs font-bold tracking-widest flex items-center gap-2`}
            >
              <Activity size={14} /> {status.label}
            </div>
          </div>
          <p className="text-gray-400">{subjectData.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          <div
            className={`p-8 rounded-3xl border transition-all ${
              isLocked
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-900 border-orange-500/30 ring-1 ring-orange-500/20"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Star className="text-orange-500 w-6 h-6 fill-orange-500" />
                <h3 className="font-bold text-xl text-white">
                  Baseline Rating
                </h3>
              </div>
              {isLocked ? (
                <Lock className="text-gray-600 w-5 h-5" />
              ) : (
                <Unlock className="text-orange-500 w-5 h-5" />
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-4">
                {isLocked
                  ? "Rating locked. Adaptive difficulty active."
                  : "Set starting difficulty (1-10)."}
              </p>

              <input
                type="number"
                value={rating}
                disabled={isLocked}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setRating("");
                    return;
                  }
                  const num = parseInt(val);
                  if (num >= 1 && num <= 10) setRating(num);
                }}
                className={`w-full p-4 border rounded-2xl font-mono font-bold text-4xl text-center outline-none transition-all ${
                  isLocked
                    ? "bg-black border-gray-800 text-gray-600"
                    : "bg-black border-orange-900/50 text-orange-500 focus:border-orange-500"
                }`}
              />
            </div>

            {!isLocked && (
              <button
                onClick={handleSaveRating}
                disabled={isUpdating}
                className="w-full bg-orange-600 text-black py-4 rounded-xl font-bold hover:bg-orange-500 transition-all shadow-lg active:scale-95 text-lg flex justify-center items-center gap-2"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Confirm Rating"
                )}
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Quizzes</span>{" "}
              <b>{progress.totalQuizzes || 0}</b>
            </div>
            <div className="h-px bg-gray-800"></div>
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Level</span>{" "}
              <b>{progress.currentLevel || 1}</b>
            </div>
            <div className="h-px bg-gray-800"></div>
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Accuracy</span>{" "}
              <b className="text-green-500">
                {Math.round(progress.accuracy || 0)}%
              </b>
            </div>
          </div>
        </div>

        {/* Right Column (Curriculum) */}
        <div className="lg:col-span-8">
          <div className="bg-gray-900 rounded-3xl border border-gray-800 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 sticky top-0 z-10 backdrop-blur-md">
              <h3 className="font-bold text-2xl text-white">Mission Path</h3>
              <span className="text-orange-500 font-bold">
                {percentage}% Done
              </span>
            </div>

            <div className="divide-y divide-gray-800">
              {lessons.length === 0 ? (
                <div className="p-16 text-center text-gray-500">
                  Initializing curriculum...
                </div>
              ) : (
                lessons.map((lesson, index) => {
                  const isCompleted = progress.completedLessons?.includes(
                    lesson._id
                  );
                  const isLockedLesson =
                    !isCompleted &&
                    index > 0 &&
                    !progress.completedLessons?.includes(
                      lessons[index - 1]._id
                    );

                  return (
                    <div
                      key={lesson._id}
                      onClick={() =>
                        !isLockedLesson && navigate(`/lesson/${lesson._id}`)
                      }
                      className={`p-6 flex items-center justify-between transition-all ${
                        isLockedLesson
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-gray-800 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border font-bold ${
                            isCompleted
                              ? "border-green-500 text-green-500"
                              : "border-orange-500 text-orange-500"
                          }`}
                        >
                          {isCompleted ? <CheckCircle /> : lesson.level}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">
                            {lesson.title}
                          </h4>
                          <span className="text-gray-500 text-sm flex items-center gap-2">
                            <Clock size={12} /> {lesson.estimatedTime}m •{" "}
                            {index === 0 ? "Base Entry" : "Adaptive"}
                          </span>
                        </div>
                      </div>
                      {!isLockedLesson && (
                        <PlayCircle className="text-gray-500" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-600 p-4 rounded-full shadow-lg z-50 animate-bounce"
        >
          <ArrowUp color="white" />
        </button>
      )}
    </div>
  );
};

export default SubjectDashboard;
