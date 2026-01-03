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
  }, [interviewId]);

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
      <div className="p-20 text-orange-500 font-mono">
        LOADING MCQ INTERVIEW...
      </div>
    );

  if (showReview) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-black text-white mb-8 underline decoration-orange-500">
          FINAL EVALUATION REPORT
        </h1>
        <div className="space-y-4">
          {interview.questions.map((q, i) => {
            const res = results[i];
            return (
              <div
                key={i}
                className={`p-5 rounded-xl border ${
                  res.isCorrect
                    ? "border-green-900/30 bg-green-900/5"
                    : "border-red-900/30 bg-red-900/5"
                }`}
              >
                <p className="text-white font-bold mb-2">{q.question}</p>
                <p
                  className={`text-sm ${
                    res.isCorrect ? "text-green-400" : "text-red-400"
                  }`}
                >
                  Your Answer: {q.options[res.selectedOption]}
                  {res.isCorrect
                    ? " (Correct)"
                    : ` (Correct was: ${q.options[q.correctAnswer]})`}
                </p>
                <p className="text-gray-500 text-xs mt-2 italic">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 w-full py-4 bg-orange-600 font-black"
        >
          EXIT EVALUATION
        </button>
      </div>
    );
  }

  const q = interview.questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="mb-8 flex justify-between font-mono">
        <span className="text-orange-500">QUESTION {currentIdx + 1}/30</span>
      </div>

      <div className="bg-gray-900 p-8 rounded-2xl border-l-4 border-orange-600 mb-8">
        <h2 className="text-xl text-white font-medium">{q.question}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOpt(i)}
            className={`p-5 text-left rounded-xl border-2 transition-all ${
              selectedOpt === i
                ? "border-orange-500 bg-orange-500/10 text-white"
                : "border-gray-800 text-gray-400 hover:border-gray-600"
            }`}
          >
            <span className="mr-4 font-mono text-orange-500">
              {String.fromCharCode(65 + i)}.
            </span>{" "}
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={handleAnswer}
        disabled={selectedOpt === null}
        className="mt-8 w-full py-5 bg-orange-600 text-black font-black uppercase tracking-widest disabled:opacity-20 transition-all flex items-center justify-center gap-2"
      >
        CONFIRM & NEXT <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default InterviewPrep;
