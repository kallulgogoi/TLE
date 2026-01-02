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

  useEffect(() => {
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
  }, [attemptId]);

  if (loading)
    return (
      <div className="p-20 text-center text-gray-500">
        Calculating performance metrics...
      </div>
    );
  if (!result)
    return (
      <div className="p-20 text-center text-red-500">Result unavailable.</div>
    );

  const { quizAttempt, detailedResults } = result;
  const passed = quizAttempt.isPassed;

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 text-center">
      {passed && (
        <Confetti
          recycle={false}
          numberOfPieces={500}
          colors={["#F97316", "#EA580C", "#FFFFFF"]}
        />
      )}

      <div className="bg-gray-900 p-12 rounded-3xl shadow-2xl border border-gray-800 relative overflow-hidden">
        {/* Glow Effect */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b opacity-20 blur-3xl rounded-full ${
            passed ? "from-green-500" : "from-red-500"
          }`}
        ></div>

        <div
          className={`inline-block p-6 rounded-full mb-8 relative z-10 ${
            passed
              ? "bg-green-900/30 border-green-800"
              : "bg-red-900/30 border-red-800"
          } border`}
        >
          <span className="text-5xl">{passed ? "🎉" : "⚠️"}</span>
        </div>

        <h1 className="text-5xl font-extrabold mb-4 text-white relative z-10">
          {passed ? "Mission Accomplished!" : "Mission Failed"}
        </h1>
        <p className="text-gray-400 mb-10 text-lg relative z-10">
          Score:{" "}
          <span
            className={`font-bold ${
              passed ? "text-green-400" : "text-red-400"
            }`}
          >
            {quizAttempt.score.toFixed(0)}%
          </span>
          {passed ? (
            <span className="text-white">
              {" "}
              • +{quizAttempt.pointsEarned} XP Awarded
            </span>
          ) : (
            ""
          )}
        </p>

        <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto relative z-10">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <div className="text-3xl font-bold text-white mb-1">
              {quizAttempt.correctAnswers}/{quizAttempt.totalQuestions}
            </div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Correct
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <div className="text-3xl font-bold text-white mb-1">
              {quizAttempt.accuracy.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Accuracy
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <div className="text-3xl font-bold text-yellow-500 mb-1">
              +{quizAttempt.pointsEarned}
            </div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              XP Gained
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 relative z-10">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold border border-gray-700 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <Home size={20} /> Dashboard
          </Link>

          {passed ? (
            <button
              onClick={() =>
                navigate(`/subject/${quizAttempt.subject}/dashboard`)
              }
              className="flex items-center gap-2 bg-orange-600 text-black px-10 py-4 rounded-xl font-bold hover:bg-orange-500 shadow-lg shadow-orange-900/30 transition-all hover:scale-105"
            >
              Continue Mission <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white text-black px-10 py-4 rounded-xl font-bold hover:bg-gray-200 shadow-lg transition-all"
            >
              <RotateCcw size={20} /> Retry Level
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 text-left">
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
          <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
          Debriefing & Analysis
        </h2>
        <div className="space-y-6">
          {detailedResults.map((q, i) => (
            <div
              key={i}
              className={`bg-gray-900 p-8 rounded-2xl border-l-4 ${
                q.isCorrect ? "border-green-500" : "border-red-500"
              } border-y border-r border-gray-800 shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-bold text-lg mb-4 text-gray-200">
                    <span className="text-gray-600 mr-3 font-mono">
                      Q{i + 1}
                    </span>
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    <p className="text-gray-400">
                      Your Answer:{" "}
                      <span
                        className={`font-bold ml-2 ${
                          q.isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {q.options[q.selectedOption]}
                      </span>
                    </p>

                    {!q.isCorrect && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-green-500 font-bold bg-green-900/20 px-3 py-1 rounded border border-green-900/50 text-sm">
                          Correct: {q.options[q.correctOption]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-6 shrink-0">
                  {q.isCorrect ? (
                    <CheckCircle className="text-green-500 w-8 h-8" />
                  ) : (
                    <XCircle className="text-red-500 w-8 h-8" />
                  )}
                </div>
              </div>

              {q.explanation && (
                <div className="mt-6 text-sm text-gray-400 bg-black/50 p-5 rounded-xl border border-gray-800 leading-relaxed">
                  <span className="font-bold text-orange-500 block mb-1 uppercase tracking-wide text-xs">
                    Explanation
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
