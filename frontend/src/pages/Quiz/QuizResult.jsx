import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Confetti from "react-confetti";
import { CheckCircle, XCircle, RotateCcw, Home, Info } from "lucide-react";
import toast from "react-hot-toast";

const QuizResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
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

        if (data.quizAttempt.score < 40) {
          toast.error("MISSION FAILED: Score below 40%. Re-attempt required.", {
            duration: 5000,
            icon: "⚠️",
            style: {
              borderRadius: "10px",
              background: "#111",
              color: "#ef4444",
              border: "1px solid #ef4444",
              fontSize: "14px",
              fontWeight: "bold",
            },
          });
        } else {
          toast.success("MISSION ACCOMPLISHED!");
        }
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
      <div className="min-h-dvh flex items-center justify-center p-6 text-center text-orange-500 font-mono animate-pulse">
        Calculating performance metrics...
      </div>
    );

  if (!result) return null;

  const { quizAttempt, detailedResults } = result;
  const passed = quizAttempt.score >= 40;

  return (
    <div className="max-w-4xl mx-auto mt-6 sm:mt-10 mb-20 px-4 sm:px-6">
      {passed && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={["#F97316", "#EA580C", "#FFFFFF"]}
        />
      )}
      <div className="bg-gray-900 rounded-[2.5rem] border border-gray-800 relative overflow-hidden shadow-2xl">
        <div
          className={`absolute top-0 left-0 w-full h-2 ${
            passed ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>

        <div className="p-8 sm:p-14 text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 border-2 ${
              passed
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            }`}
          >
            {passed ? <CheckCircle size={48} /> : <XCircle size={48} />}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-4 text-white tracking-tighter uppercase italic leading-none">
            {passed ? "Mission Success" : "Mission Failed"}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div
              className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                passed
                  ? "bg-green-500 text-black"
                  : "bg-red-500 text-white animate-pulse"
              }`}
            >
              {passed ? "Qualified" : "Disqualified"}
            </div>
            <div className="text-gray-400 font-mono text-lg">
              SCORE:{" "}
              <span className={passed ? "text-green-400" : "text-red-400"}>
                {quizAttempt.score.toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-black/40 p-6 rounded-3xl border border-gray-800">
              <div className="text-3xl font-black text-white">
                {quizAttempt.correctAnswers}/{quizAttempt.totalQuestions}
              </div>
              <div className="text-[10px] text-gray-500 font-black uppercase">
                Accuracy
              </div>
            </div>
            <div className="bg-black/40 p-6 rounded-3xl border border-gray-800">
              <div className="text-3xl font-black text-yellow-500">
                +{quizAttempt.pointsEarned}
              </div>
              <div className="text-[10px] text-gray-500 font-black uppercase">
                XP Gained
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-black/40 p-6 rounded-3xl border border-gray-800">
              <div className="text-3xl font-black text-blue-400">
                {Math.floor(quizAttempt.timeTaken / 60)}m
              </div>
              <div className="text-[10px] text-gray-500 font-black uppercase">
                Time Taken
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-black uppercase text-xs border-2 border-gray-800 hover:bg-gray-800 text-gray-300 transition-all"
            >
              <Home size={18} /> Exit to Base
            </Link>

            {!passed && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-500 shadow-xl active:scale-95 transition-all"
              >
                <RotateCcw size={18} /> Re-Initialize Mission
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 px-4 text-left">
        <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3 mb-8">
          <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
          Mission Debrief
        </h2>

        <div className="space-y-6">
          {detailedResults.map((q, i) => (
            <div
              key={i}
              className={`bg-gray-900/50 p-6 sm:p-8 rounded-[2rem] border transition-all ${
                q.isCorrect ? "border-gray-800" : "border-red-900/30"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className="font-bold text-lg text-gray-100 mb-6">
                    {q.question}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-2xl border ${
                        q.isCorrect
                          ? "bg-green-500/5 border-green-500/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <p className="text-[10px] font-black uppercase text-gray-500 mb-1">
                        Your Transmission
                      </p>
                      <p
                        className={`font-bold ${
                          q.isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {q.options[q.selectedOption]}
                      </p>
                    </div>
                    {!q.isCorrect && (
                      <div className="p-4 rounded-2xl border bg-gray-800/30 border-gray-700">
                        <p className="text-[10px] font-black uppercase text-gray-500 mb-1">
                          Verified Correct
                        </p>
                        <p className="font-bold text-white">
                          {q.options[q.correctOption]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`shrink-0 p-3 rounded-2xl border ${
                    q.isCorrect
                      ? "border-green-500/20 text-green-500"
                      : "border-red-500/20 text-red-500"
                  }`}
                >
                  {q.isCorrect ? (
                    <CheckCircle size={24} />
                  ) : (
                    <XCircle size={24} />
                  )}
                </div>
              </div>
              {q.explanation && (
                <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-gray-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Info size={14} className="text-orange-500" />
                    <span className="font-black text-orange-500 uppercase text-[10px]">
                      AI Logic Analysis
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 italic">
                    "{q.explanation}"
                  </p>
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
