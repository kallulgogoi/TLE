import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ChevronRight, Loader2, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    api
      .get(`/interviews/${interviewId}`)
      .then((res) => {
        setInterview(res.data);
        setLoading(false);
      })
      .catch(() => navigate("/dashboard"));
  }, [interviewId, navigate]);

  const handleAnswer = async () => {
    const question = interview.questions[currentIdx];
    const isCorrect = selectedOpt === question.correctAnswer;

    const newResult = {
      questionId: question._id,
      selectedOption: selectedOpt,
      isCorrect,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    if (currentIdx < interview.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
    } else {
      await api.post(`/interviews/${interviewId}/submit`, {
        answers: updatedResults,
      });
      setShowReview(true);
    }
  };

  if (loading)
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 text-orange-500 font-mono text-sm sm:text-base animate-pulse">
        LOADING MCQ INTERVIEW...
      </div>
    );

  // --- PROGRESS CALCULATION ---
  const totalQuestions = interview.questions.length;
  const progressPercentage = (currentIdx / totalQuestions) * 100;

  if (showReview) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 underline decoration-orange-500 uppercase italic">
          Final Evaluation Report
        </h1>
        <div className="space-y-4">
          {interview.questions.map((q, i) => {
            const res = results[i];
            return (
              <div
                key={i}
                className={`p-4 sm:p-5 rounded-xl border ${
                  res.isCorrect
                    ? "border-green-900/30 bg-green-900/5"
                    : "border-red-900/30 bg-red-900/5"
                }`}
              >
                <p className="text-white font-bold mb-2 text-sm sm:text-base">
                  {q.question}
                </p>
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    res.isCorrect ? "text-green-400" : "text-red-400"
                  }`}
                >
                  Your Answer: {q.options[res.selectedOption]}
                  {res.isCorrect
                    ? " (Correct)"
                    : ` (Correct was: ${q.options[q.correctAnswer]})`}
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-2 italic">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 w-full py-4 bg-orange-600 text-black font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95"
        >
          Exit Evaluation
        </button>
      </div>
    );
  }

  const q = interview.questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-12 min-h-[100dvh] flex flex-col">
      {/* --- NEW PROGRESS BAR --- */}
      <div className="w-full bg-gray-800 h-1.5 sm:h-2 rounded-full overflow-hidden mb-6 shadow-inner">
        <div
          className="bg-orange-600 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(234,88,12,0.5)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mb-6 flex justify-between font-mono text-[10px] sm:text-sm">
        <span className="text-orange-500 font-black uppercase tracking-widest">
          Sync Status: {Math.round(progressPercentage)}% Complete
        </span>
        <span className="text-gray-500">
          Question {currentIdx + 1}/{totalQuestions}
        </span>
      </div>

      <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl border-l-4 border-orange-600 mb-6 sm:mb-8 shadow-2xl">
        <h2 className="text-lg sm:text-xl text-white font-medium leading-relaxed">
          {q.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 flex-grow">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOpt(i)}
            className={`p-4 sm:p-5 text-left rounded-xl border-2 transition-all active:scale-[0.98] sm:active:scale-100 ${
              selectedOpt === i
                ? "border-orange-500 bg-orange-500/10 text-white shadow-lg"
                : "border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300"
            }`}
          >
            <div className="flex items-start">
              <span className="mr-3 sm:mr-4 font-mono text-orange-600 font-black">
                {String.fromCharCode(65 + i)}.
              </span>{" "}
              <span className="text-sm sm:text-base font-bold">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleAnswer}
        disabled={selectedOpt === null}
        className="mt-8 w-full py-4 sm:py-5 bg-orange-600 text-black font-black uppercase tracking-widest disabled:opacity-20 transition-all flex items-center justify-center gap-2 shadow-xl hover:bg-white active:scale-95"
      >
        Confirm & Next <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default InterviewPrep;
