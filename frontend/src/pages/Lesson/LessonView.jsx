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
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-orange-500 text-2xl font-mono animate-pulse">
          LOADING MISSION DATA...
        </div>
      </div>
    );

  if (!lesson)
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-red-500 text-xl font-mono">
          DATA CORRUPTED OR MISSING
        </div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/5 via-transparent to-cyan-900/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_99%,rgba(234,88,12,0.05)_100%)] animate-scan pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto py-12 px-6 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-2 text-gray-500 hover:text-orange-400 transition-all duration-300 font-mono text-sm uppercase tracking-wider hover:scale-105"
          >
            <ArrowLeft size={18} />
            Abort Mission
          </button>

          <div className="bg-gray-950/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="p-12 border-b border-gray-800 bg-gradient-to-r from-orange-950/20 to-transparent">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-900/30 border border-orange-700/50 rounded-full text-orange-400 font-mono text-xs uppercase tracking-wider">
                  <Target size={14} />
                  Level {lesson.level}
                </span>
                <span className="text-gray-500 font-mono text-xs uppercase">
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

              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-lg">
                {lesson.title}
              </h1>
            </div>

            <div className="p-12 prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-12 mb-6 text-white border-l-4 border-orange-500 pl-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-10 mb-5 text-orange-400 uppercase tracking-wide font-mono flex items-center gap-3">
                      <span className="text-cyan-400">&gt;</span> {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-300">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 leading-relaxed text-gray-300 text-lg">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-3 mb-8 pl-4">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-orange-500 mt-2">▸</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-bold">{children}</strong>
                  ),
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>

            <div className="p-12 bg-gradient-to-r from-gray-950/90 via-black/80 to-gray-950/90 border-t border-orange-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,88,12,0.1),transparent_50%)] animate-pulse" />

              {lesson.quiz ? (
                <button
                  onClick={() => navigate(`/quiz/start/${lesson._id}`)}
                  className="group relative flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 text-black font-black uppercase tracking-widest text-lg overflow-hidden border-2 border-orange-400/50 shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 active:scale-[0.98] backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-3 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-transparent to-orange-400/30 -skew-x-3" />

                  <BrainCircuit
                    size={28}
                    className="relative z-10 drop-shadow-lg group-hover:animate-spin-slow group-hover:scale-110 transition-all duration-500"
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-sm tracking-widest">EXECUTE</span>
                    <span className="text-xl">ASSESSMENT</span>
                  </span>

                  <div className="absolute right-4 w-8 h-8 bg-white/20 rounded-full group-hover:scale-150 transition-all duration-500" />
                </button>
              ) : (
                <div className="group relative flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-red-900/40 to-red-950/60 backdrop-blur-md border border-red-800/50 rounded-2xl font-mono text-lg text-red-300 shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:bg-red-900/60">
                  <AlertTriangle size={24} className="animate-pulse" />
                  <span className="uppercase tracking-widest border-l-2 border-red-600/50 pl-4 pr-2">
                    ASSESSMENT OFFLINE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 group p-4 bg-gradient-to-br from-orange-600/90 to-orange-700/90 hover:from-orange-500 hover:to-orange-600 text-black rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 active:scale-95 border border-orange-400/50 backdrop-blur-sm z-50"
          >
            <ArrowUp
              size={22}
              className="group-hover:rotate-180 transition-transform duration-300"
            />
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
