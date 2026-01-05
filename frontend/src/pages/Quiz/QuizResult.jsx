import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Confetti from "react-confetti";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Home,
} from "lucide-react";

const QuizResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Screen size state for Confetti responsiveness
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    const fetchResult = async () => {
      try {
        const { data } = await api.get(`/quizzes/results/${attemptId}`);
        setResult(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
    return () => window.removeEventListener("resize", handleResize);
  }, [attemptId]);

  if (loading)
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 text-center text-gray-500 font-mono animate-pulse">
        Calculating performance metrics...
      </div>
    );
  if (!result)
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 text-center text-red-500 font-mono">
        Result unavailable.
      </div>
    );

  const { quizAttempt, detailedResults } = result;
  const passed = quizAttempt.isPassed;

  return (
    <div className="max-w-4xl mx-auto mt-6 sm:mt-10 mb-20 px-4 sm:px-6 text-center">
      {passed && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={windowSize.width < 640 ? 200 : 500}
          colors={["#F97316", "#EA580C", "#FFFFFF"]}
        />
      )}

      {/* RESULT CARD */}
      <div className="bg-gray-900 p-6 sm:p-12 rounded-3xl shadow-2xl border border-gray-800 relative overflow-hidden">
        {/* Glow Effect */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b opacity-20 blur-3xl rounded-full ${
            passed ? "from-green-500" : "from-red-500"
          }`}
        ></div>

        <div
          className={`inline-block p-4 sm:p-6 rounded-full mb-6 sm:mb-8 relative z-10 ${
            passed
              ? "bg-green-900/30 border-green-800"
              : "bg-red-900/30 border-red-800"
          } border`}
        >
          <span className="text-4xl sm:text-5xl">{passed ? "🎉" : "⚠️"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 sm:mb-4 text-white relative z-10 leading-tight">
          {passed ? "Mission Accomplished!" : "Mission Failed"}
        </h1>

        <p className="text-gray-400 mb-8 sm:mb-10 text-base sm:text-lg relative z-10">
          Score:{" "}
          <span
            className={`font-bold ${
              passed ? "text-green-400" : "text-red-400"
            }`}
          >
            {quizAttempt.score.toFixed(0)}%
          </span>
          {passed && (
            <span className="text-white block sm:inline">
              <span className="hidden sm:inline"> • </span>+
              {quizAttempt.pointsEarned} XP Awarded
            </span>
          )}
        </p>

        {/* STATS GRID: Stacks on small mobile, 3-col on tablets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 max-w-2xl mx-auto relative z-10">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {quizAttempt.correctAnswers}/{quizAttempt.totalQuestions}
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Correct
            </div>
          </div>
          <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {quizAttempt.accuracy.toFixed(0)}%
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Accuracy
            </div>
          </div>
          <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1">
              +{quizAttempt.pointsEarned}
            </div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              XP Gained
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS: Column on mobile, Row on tablet */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 relative z-10">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border border-gray-700 hover:bg-gray-800 text-gray-300 transition-colors order-2 sm:order-1"
          >
            <Home size={20} /> Dashboard
          </Link>

          {passed ? (
            <button
              onClick={() =>
                navigate(`/subject/${quizAttempt.subject}/dashboard`)
              }
              className="flex items-center justify-center gap-2 bg-orange-600 text-black px-10 py-4 rounded-xl font-bold hover:bg-orange-500 shadow-lg active:scale-95 transition-all order-1 sm:order-2"
            >
              Continue Mission <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-xl font-bold hover:bg-gray-200 shadow-lg active:scale-95 transition-all order-1 sm:order-2"
            >
              <RotateCcw size={20} /> Retry Level
            </button>
          )}
        </div>
      </div>

      {/* DEBRIEFING SECTION */}
      <div className="mt-12 text-left">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white flex items-center gap-3">
          <div className="w-1 h-6 sm:h-8 bg-orange-500 rounded-full"></div>
          Debriefing & Analysis
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {detailedResults.map((q, i) => (
            <div
              key={i}
              className={`bg-gray-900 p-5 sm:p-8 rounded-2xl border-l-4 ${
                q.isCorrect ? "border-green-500" : "border-red-500"
              } border-y border-r border-gray-800 shadow-lg`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-bold text-base sm:text-lg mb-4 text-gray-200 leading-tight">
                    <span className="text-gray-600 mr-2 sm:mr-3 font-mono text-sm sm:text-base">
                      Q{i + 1}
                    </span>
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm sm:text-base">
                      Your Answer:{" "}
                      <span
                        className={`font-bold block sm:inline ${
                          q.isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {q.options[q.selectedOption]}
                      </span>
                    </p>

                    {!q.isCorrect && (
                      <div className="mt-2">
                        <span className="inline-block text-green-500 font-bold bg-green-900/20 px-3 py-1 rounded border border-green-900/50 text-xs sm:text-sm">
                          Correct: {q.options[q.correctOption]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  {q.isCorrect ? (
                    <CheckCircle className="text-green-500 w-6 h-6 sm:w-8 sm:h-8" />
                  ) : (
                    <XCircle className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                </div>
              </div>

              {q.explanation && (
                <div className="mt-6 text-xs sm:text-sm text-gray-400 bg-black/50 p-4 sm:p-5 rounded-xl border border-gray-800 leading-relaxed">
                  <span className="font-bold text-orange-500 block mb-1 uppercase tracking-wide text-[10px] sm:text-xs">
                    Technical Intelligence
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
