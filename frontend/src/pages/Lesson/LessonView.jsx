import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowLeft,
  BrainCircuit,
  ArrowUp,
  Target,
  AlertTriangle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchLessonData();
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id, user]);

  const fetchLessonData = async () => {
    try {
      const { data } = await api.get(`/lessons/${id}`);
      setLesson(data);
    } catch (error) {
      console.error("Error loading lesson", error);
      toast.error("Error loading briefing data");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-black px-6 text-center">
        <div className="text-orange-500 text-lg sm:text-2xl font-mono animate-pulse tracking-tighter">
          LOADING MISSION DATA...
        </div>
      </div>
    );

  if (!lesson)
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-black px-6 text-center">
        <div className="text-red-500 text-lg sm:text-xl font-mono">
          DATA CORRUPTED OR MISSING
        </div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/5 via-transparent to-cyan-900/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_99%,rgba(234,88,12,0.05)_100%)] animate-scan pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 relative z-10">
          {/* Back Button - Scaled for touch */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 sm:mb-10 flex items-center gap-2 text-gray-500 hover:text-orange-400 transition-all duration-300 font-mono text-xs sm:text-sm uppercase tracking-wider p-2"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Abort Mission</span>
            <span className="sm:hidden">Abort</span>
          </button>

          <div className="bg-gray-950/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
            {/* Header Section - Responsive Padding & Text */}
            <div className="p-6 sm:p-12 border-b border-gray-800 bg-gradient-to-r from-orange-950/20 to-transparent">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-900/30 border border-orange-700/50 rounded-full text-orange-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
                  <Target size={12} className="sm:w-3.5 sm:h-3.5" />
                  Level {lesson.level}
                </span>
                <span className="text-gray-500 font-mono text-[10px] sm:text-xs uppercase">
                  Difficulty:{" "}
                  <span
                    className={
                      lesson.ratingGroup > 7
                        ? "text-red-500"
                        : lesson.ratingGroup > 3
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {lesson.ratingGroup > 7
                      ? "Hard"
                      : lesson.ratingGroup > 3
                      ? "Medium"
                      : "Easy"}
                  </span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-lg leading-tight">
                {lesson.title}
              </h1>
            </div>

            {/* Markdown Content - Responsive Proximity & Text Scaling */}
            <div className="p-6 sm:p-12 prose prose-invert prose-sm sm:prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-12 mb-4 sm:mb-6 text-white border-l-4 border-orange-500 pl-4 sm:pl-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-10 mb-3 sm:mb-5 text-orange-400 uppercase tracking-wide font-mono flex items-center gap-2 sm:gap-3">
                      <span className="text-cyan-400">&gt;</span> {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 sm:mb-6 leading-relaxed text-gray-300 text-base sm:text-lg">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-2 sm:space-y-3 mb-6 sm:mb-8 pl-2 sm:pl-4">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 sm:gap-3 text-gray-300 text-sm sm:text-lg">
                      <span className="text-orange-500 mt-1.5">▸</span>
                      <span>{children}</span>
                    </li>
                  ),
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>

            {/* Action Footer - Fluid Buttons */}
            <div className="p-6 sm:p-12 bg-gradient-to-r from-gray-950/90 via-black/80 to-gray-950/90 border-t border-orange-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,88,12,0.1),transparent_50%)] animate-pulse" />

              {lesson.quiz ? (
                <button
                  onClick={() => navigate(`/quiz/start/${lesson._id}`)}
                  className="group relative w-full sm:w-auto flex items-center justify-center gap-3 sm:gap-4 px-6 py-4 sm:px-10 sm:py-6 bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 text-black font-black uppercase tracking-widest text-base sm:text-lg overflow-hidden border-2 border-orange-400/50 shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] rounded-xl sm:rounded-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-3 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <BrainCircuit
                    size={24}
                    className="relative z-10 sm:w-7 sm:h-7 group-hover:animate-spin-slow transition-all"
                  />
                  <span className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-none">
                    <span className="text-[10px] sm:text-sm tracking-tighter sm:tracking-widest opacity-80 sm:opacity-100">
                      EXECUTE
                    </span>
                    <span className="text-lg sm:text-xl">ASSESSMENT</span>
                  </span>
                </button>
              ) : (
                <div className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-6 py-4 sm:px-10 sm:py-6 bg-red-950/40 backdrop-blur-md border border-red-800/50 rounded-xl sm:rounded-2xl font-mono text-sm sm:text-lg text-red-300 transition-all duration-300">
                  <AlertTriangle
                    size={20}
                    className="animate-pulse sm:w-6 sm:h-6"
                  />
                  <span className="uppercase tracking-widest border-l-2 border-red-600/50 pl-4">
                    OFFLINE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll To Top - Adjusted for thumb reach */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 group p-3 sm:p-4 bg-orange-600/90 text-black rounded-xl sm:rounded-2xl shadow-2xl transition-all active:scale-90 border border-orange-400/50 backdrop-blur-sm z-50"
          >
            <ArrowUp size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-scan {
          animation: scan 12s linear infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default LessonView;
