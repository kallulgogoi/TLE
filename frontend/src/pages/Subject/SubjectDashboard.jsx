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

  // MAX_LEVEL constant for progress calculation
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
      // Fetching fresh dashboard data
      const { data } = await api.get(`/subjects/${subjectId}`);
      setSubjectData(data);
      setLessons(data.lessons || []);

      if (data.userProgress) {
        const prog = data.userProgress;
        setUserProgress({
          currentLevel: prog.currentLevel || 1,
          // Use totalAttempts or calculate from completed length if field name varies
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
      await fetchData(); // Refresh data after locking rating
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

  // UPDATED: Progress based on currentLevel vs MAX_LEVEL
  const progressPercentage = Math.min(
    100,
    Math.round(((userProgress.currentLevel - 1) / MAX_LEVEL) * 100) || 0
  );

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-sm mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

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
                <span className="text-gray-400">Current Level</span>
                <span className="text-orange-500 font-black text-3xl">
                  {userProgress.currentLevel}
                </span>
                <span className="text-gray-700 text-sm uppercase font-mono">
                  / {MAX_LEVEL}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
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
              className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-center text-4xl font-bold text-orange-500 focus:border-orange-500 outline-none transition mb-4 disabled:opacity-50"
            />

            {!isLocked ? (
              <button
                onClick={handleSaveRating}
                disabled={isUpdating}
                className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-4 rounded-xl transition flex items-center justify-center gap-2 text-lg uppercase tracking-tighter"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Target className="w-5 h-5" />
                )}
                {isUpdating ? "Initializing..." : "Confirm Rating"}
              </button>
            ) : (
              <p className="text-center text-xs font-mono text-gray-600 mt-3 uppercase tracking-widest">
                Rating locked — Level {userProgress.currentLevel} protocols
                active
              </p>
            )}
          </div>

          {/* Progress Bar relative to MAX_LEVEL */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 font-mono text-xs uppercase">
                Overall Synchronization
              </span>
              <span className="text-2xl font-black text-orange-500">
                {progressPercentage}%
              </span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-gradient-to-r from-orange-700 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center group hover:border-orange-500/50 transition-colors">
              <Activity className="w-9 h-9 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-500 text-xs uppercase font-mono">
                Quizzes Attempted
              </p>
              <p className="text-3xl font-black text-white mt-2">
                {userProgress.totalQuizzes}
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center group hover:border-green-500/50 transition-colors">
              <Target className="w-9 h-9 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-500 text-xs uppercase font-mono">
                Avg Accuracy
              </p>
              <p
                className={`text-3xl font-black mt-2 ${
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
        <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-800 bg-gray-900/50">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                Mission Modules
              </h2>
              <span className="text-gray-500 font-mono text-xs">
                {userProgress.completedLessons.length} / {lessons.length}{" "}
                COMPLETE
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-800">
            {lessons.length === 0 ? (
              <div className="py-20 text-center text-gray-600 font-mono text-sm">
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
                    className={`px-8 py-6 flex items-center justify-between transition-all ${
                      isLockedLesson
                        ? "opacity-30 grayscale cursor-not-allowed"
                        : "hover:bg-orange-600/5 cursor-pointer group"
                    }`}
                  >
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border-2 transition-colors ${
                          isCompleted
                            ? "border-green-500 text-green-500 bg-green-500/10"
                            : "border-orange-500 text-orange-500 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-black"
                        }`}
                      >
                        {isCompleted ? <CheckCircle size={30} /> : lesson.level}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-lg text-white group-hover:text-orange-500 transition-colors truncate">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-gray-500 flex items-center gap-1.5 font-mono uppercase">
                            <Clock size={12} /> {lesson.estimatedTime || 15} MIN
                          </p>
                          {isCompleted && (
                            <span className="text-[10px] bg-green-900/40 text-green-500 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                              Mastered
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {isLockedLesson ? (
                      <Lock className="w-6 h-6 text-gray-700" />
                    ) : (
                      <div className="p-3 rounded-full bg-gray-800 group-hover:bg-orange-600 transition-colors">
                        <PlayCircle className="w-6 h-6 text-orange-500 group-hover:text-black" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-orange-600 hover:bg-orange-500 text-black p-4 rounded-2xl shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all z-50 animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default SubjectDashboard;
