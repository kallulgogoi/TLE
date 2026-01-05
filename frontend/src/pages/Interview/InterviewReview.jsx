import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
} from "lucide-react";

const InterviewReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await api.get(`/interviews/${id}`);
        setData(res.data);
      } catch (err) {
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id, navigate]);

  if (loading)
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 text-center font-mono text-orange-500 animate-pulse text-sm sm:text-base">
        RECONSTRUCTING DATA...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Back Button - Increased tap target for mobile */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-gray-500 hover:text-white mb-6 sm:mb-8 font-mono text-[10px] sm:text-xs uppercase tracking-widest p-1"
      >
        <ArrowLeft size={14} className="mr-2" /> Return to Dashboard
      </button>

      <div className="mb-8 sm:mb-12">
        {/* Title - Scaled text for mobile */}
        <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter italic leading-tight">
          Evaluation:{" "}
          <span className="text-orange-500 sm:text-white">
            {data.subject?.name}
          </span>
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 sm:mt-2">
          <span className="text-gray-500 font-mono text-[9px] sm:text-[10px] uppercase">
            Status: Declassified
          </span>
          <span className="text-gray-500 font-mono text-[9px] sm:text-[10px] uppercase">
            Date: {new Date(data.completedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {data.questions.map((q, idx) => {
          const userAnswer = data.answers.find(
            (a) => a.questionId.toString() === q._id.toString()
          );
          const isCorrect = userAnswer?.isCorrect;
          const isSkipped =
            userAnswer?.selectedOption === null ||
            userAnswer?.selectedOption === undefined;

          return (
            <div
              key={idx}
              className={`p-5 sm:p-8 rounded-2xl border-2 transition-all ${
                isSkipped
                  ? "border-gray-800 bg-gray-900/30"
                  : isCorrect
                  ? "border-green-900/30 bg-green-900/10"
                  : "border-red-900/30 bg-red-900/10"
              }`}
            >
              {/* Card Header - Responsive Flex */}
              <div className="flex flex-row justify-between items-center mb-5 sm:mb-6 gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 bg-black/40 px-2 py-1 rounded truncate">
                  SECTOR {idx + 1} // {q.topic}
                </span>
                {isSkipped ? (
                  <span className="text-gray-400 flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase flex-shrink-0">
                    <AlertCircle size={12} /> Skipped
                  </span>
                ) : isCorrect ? (
                  <span className="text-green-500 flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase flex-shrink-0">
                    <CheckCircle size={12} /> Success
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase flex-shrink-0">
                    <XCircle size={12} /> Compromised
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl text-white font-bold mb-6 sm:mb-8 leading-snug">
                {q.question}
              </h3>

              {/* Options Grid - Always single col on mobile, 2 col on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {q.options.map((opt, i) => {
                  const isUserSelection = userAnswer?.selectedOption === i;
                  const isCorrectAnswer = q.correctAnswer === i;

                  let borderClass = "border-gray-800 text-gray-500";
                  if (isCorrectAnswer)
                    borderClass =
                      "border-green-500 bg-green-500/20 text-white shadow-[0_0_15px_rgba(34,197,94,0.1)]";
                  if (isUserSelection && !isCorrectAnswer)
                    borderClass = "border-red-500 bg-red-500/20 text-white";

                  return (
                    <div
                      key={i}
                      className={`p-3 sm:p-4 rounded-xl text-xs sm:text-sm border-2 font-medium transition-colors ${borderClass}`}
                    >
                      <span className="mr-2 opacity-50 font-mono">
                        {String.fromCharCode(65 + i)}.
                      </span>{" "}
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Section */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-black/40 rounded-xl border border-gray-800/50">
                <div className="flex items-center gap-2 text-orange-500 mb-2">
                  <Info size={14} />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                    Technical Intel
                  </span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Action - Fixed position option on mobile? No, stick to bottom of content for accessibility */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-10 sm:mt-12 w-full py-4 sm:py-5 bg-orange-600 text-black font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-white transition-all active:scale-95 shadow-2xl text-sm sm:text-base"
      >
        Close Report
      </button>
    </div>
  );
};

export default InterviewReview;
