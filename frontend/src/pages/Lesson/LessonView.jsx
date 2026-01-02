import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  BrainCircuit,
  ArrowUp,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast"; // Import Toast

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, checkUser } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTheoryCompleted, setIsTheoryCompleted] = useState(false);
  const [markingLoading, setMarkingLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); // Scroll state

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

      if (user && user.subjects) {
        const userSubject = user.subjects.find(
          (s) =>
            s.subjectId &&
            (s.subjectId._id === data.subject._id ||
              s.subjectId === data.subject._id)
        );

        if (userSubject) {
          const theoryDone = userSubject.theoryCompletedLessons?.includes(id);
          const quizDone = userSubject.completedLessons?.includes(id);
          setIsTheoryCompleted(theoryDone || quizDone);
        }
      }
    } catch (error) {
      console.error("Error loading lesson", error);
      toast.error("Error loading lesson data");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      setMarkingLoading(true);
      await api.post("/users/lesson/complete-theory", { lessonId: id });
      setIsTheoryCompleted(true);
      await checkUser();

      toast.success("Theory marked as read! Quiz unlocked.");
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (error) {
      toast.error("Error updating progress");
    } finally {
      setMarkingLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="p-20 text-center text-gray-500">Decrypting data...</div>
    );
  if (!lesson)
    return <div className="p-20 text-center text-red-500">Data not found</div>;

  return (
    <div className="w-full max-w-5xl mx-auto pb-20 relative">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Return to Mission Control
      </button>

      <div className="bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-10 border-b border-gray-800 bg-gray-900 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-orange-500 font-bold text-xs uppercase bg-orange-900/20 px-3 py-1 rounded-full border border-orange-900/50">
              Level {lesson.level} Protocol
            </span>
            {isTheoryCompleted && (
              <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                <CheckCircle size={12} /> COMPLETED
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {lesson.title}
          </h1>
        </div>

        {/* Content */}
        <div className="p-10 md:p-14 bg-black">
          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl font-bold mt-10 mb-6 text-white border-b border-gray-800 pb-2"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-bold mt-12 mb-4 text-orange-500 flex items-center gap-2"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="mb-6 leading-relaxed text-gray-300"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-orange-400 border border-gray-700"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-900 p-6 rounded-xl overflow-x-auto border border-gray-800 mb-8 shadow-inner"
                    {...props}
                  />
                ),
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-10 bg-gray-900 border-t border-gray-800">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            {lesson.quiz && isTheoryCompleted && (
              <button
                onClick={() => navigate(`/quiz/start/${lesson._id}`)}
                className="w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-xl shadow-orange-900/40 hover:scale-105 transition-transform animate-pulse"
              >
                <BrainCircuit size={28} />
                INITIATE ASSESSMENT
              </button>
            )}

            {!isTheoryCompleted && (
              <div className="w-full max-w-2xl bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-white font-bold text-lg mb-2">
                  Ready to proceed?
                </h3>
                <p className="text-gray-400 mb-6">
                  Confirm you have studied the material above to unlock the
                  quiz.
                </p>
                <button
                  onClick={handleMarkComplete}
                  disabled={markingLoading}
                  className="w-full bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  {markingLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CheckCircle size={20} /> Mark Intel Acquired
                    </>
                  )}
                </button>
              </div>
            )}

            {isTheoryCompleted && (
              <p className="text-green-500 font-medium flex items-center gap-2 bg-green-900/10 px-4 py-2 rounded-full border border-green-900/30">
                <CheckCircle size={16} /> Theory Module Completed
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Floating Scroll Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-500 transition-all transform hover:scale-110 z-50 animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default LessonView;
