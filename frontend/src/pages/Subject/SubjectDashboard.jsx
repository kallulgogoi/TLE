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

  const MAX_LEVEL = 10;

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
          totalQuizzes: prog.totalAttempts || prog.totalQuizzes || 0,
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
      <div className="min-h-[100dvh] bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 animate-spin" />
      </div>
    );

  if (!subjectData)
    return (
      <div className="min-h-[100dvh] bg-black flex items-center justify-center text-gray-500 text-lg sm:text-xl px-6 text-center">
        Subject not found
      </div>
    );

  const progressPercentage = Math.min(
    100,
    Math.round(((userProgress.currentLevel - 1) / MAX_LEVEL) * 100) || 0
  );

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Back Button - Bigger tap target for mobile */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-xs sm:text-sm mb-6 sm:mb-8 py-2"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black text-black flex-shrink-0 shadow-lg">
              {subjectData.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 leading-tight uppercase tracking-tight">
                {subjectData.name}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg">
                <span className="text-gray-400">Current Level</span>
                <span className="text-orange-500 font-black text-2xl sm:text-3xl">
                  {userProgress.currentLevel}
                </span>
                <span className="text-gray-700 text-xs sm:text-sm uppercase font-mono">
                  / {MAX_LEVEL}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Info Cards */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
          {/* Baseline Rating Card */}
          <div className="bg-gray-900 rounded-2xl p-5 sm:p-8 border border-gray-800 shadow-xl">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-300 flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                Baseline Rating
              </h3>
              {isLocked && <Lock className="w-4 h-4 text-gray-600" />}
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
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 sm:py-4 text-center text-3xl sm:text-4xl font-bold text-orange-500 focus:border-orange-500 outline-none transition mb-4 disabled:opacity-50"
            />

            {!isLocked ? (
              <button
                onClick={handleSaveRating}
                disabled={isUpdating}
                className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-3.5 sm:py-4 rounded-xl transition flex items-center justify-center gap-2 text-sm sm:text-lg uppercase tracking-tighter active:scale-[0.98]"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Target className="w-5 h-5" />
                )}
                {isUpdating ? "Initializing..." : "Confirm Rating"}
              </button>
            ) : (
              <p className="text-center text-[10px] font-mono text-gray-600 mt-2 uppercase tracking-widest">
                Rating locked — Level {userProgress.currentLevel} protocols
                active
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-800">
            <div className="flex justify-between items-end mb-3">
              <span className="text-gray-500 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
                Overall Synchronization
              </span>
              <span className="text-xl sm:text-2xl font-black text-orange-500 leading-none">
                {progressPercentage}%
              </span>
            </div>
            <div className="h-2.5 sm:h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-gradient-to-r from-orange-700 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-800 text-center group hover:border-orange-500/50 transition-colors">
              <Activity className="w-7 h-7 sm:w-9 sm:h-9 text-orange-500 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase font-mono">
                Quizzes Attempted
              </p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                {userProgress.totalQuizzes}
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-800 text-center group hover:border-green-500/50 transition-colors">
              <Target className="w-7 h-7 sm:w-9 sm:h-9 text-green-500 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase font-mono">
                Avg Accuracy
              </p>
              <p
                className={`text-2xl sm:text-3xl font-black mt-1 ${
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

        {/* Lessons List Section */}
        <div className="bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-gray-800 bg-gray-900/50">
            <div className="flex justify-between items-center">
              <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-tighter">
                Mission Modules
              </h2>
              <span className="text-gray-500 font-mono text-[10px] sm:text-xs">
                {userProgress.completedLessons.length}/{lessons.length} COMPLETE
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-800">
            {lessons.length === 0 ? (
              <div className="py-16 text-center text-gray-600 font-mono text-xs sm:text-sm">
                NO MODULES INITIALIZED
              </div>
            ) : (
              lessons.map((lesson, index) => {
                const isCompleted = userProgress.completedLessons.some(
                  (cl) => (cl.lesson?._id || cl.lesson || cl) === lesson._id
                );
                const isSequenceLocked =
                  !isCompleted &&
                  index > 0 &&
                  !userProgress.completedLessons.some(
                    (cl) =>
                      (cl.lesson?._id || cl.lesson || cl) ===
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
                    className={`px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between transition-all ${
                      isLockedLesson
                        ? "opacity-30 grayscale cursor-not-allowed"
                        : "hover:bg-orange-600/5 cursor-pointer group"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-sm sm:text-xl border-2 transition-colors ${
                          isCompleted
                            ? "border-green-500 text-green-500 bg-green-500/10"
                            : "border-orange-500 text-orange-500 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-black"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                        ) : (
                          lesson.level
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm sm:text-lg text-white group-hover:text-orange-500 transition-colors truncate">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-0.5 sm:mt-1">
                          <p className="text-[10px] text-gray-500 flex items-center gap-1 font-mono uppercase">
                            <Clock size={10} /> {lesson.estimatedTime || 15} MIN
                          </p>
                          {isCompleted && (
                            <span className="text-[8px] sm:text-[10px] bg-green-900/40 text-green-500 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">
                              Mastered
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-3">
                      {isLockedLesson ? (
                        <Lock className="w-5 h-5 text-gray-700" />
                      ) : (
                        <div className="p-2 sm:p-3 rounded-full bg-gray-800 group-hover:bg-orange-600 transition-colors">
                          <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 group-hover:text-black" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Floating Scroll Top - Adjusted for mobile position */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-orange-600 hover:bg-orange-500 text-black p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all z-50 animate-bounce active:scale-90"
        >
          <ArrowUp size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
};

export default SubjectDashboard;
