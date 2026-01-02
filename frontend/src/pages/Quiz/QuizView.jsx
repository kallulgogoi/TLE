import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Timer, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const QuizView = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const startQuiz = async () => {
      try {
        const { data } = await api.get(`/quizzes/lesson/${lessonId}/start`);
        setQuizData(data);
        setTimeLeft(data.timeLimit || 600);
        setAnswers(new Array(data.totalQuestions).fill(null));
      } catch (error) {
        alert(error.response?.data?.message || "Error starting quiz");
        navigate(-1);
      }
    };
    startQuiz();
  }, [lessonId, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && quizData && !isSubmitting) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && quizData && !isSubmitting) {
      submitQuiz();
    }
  }, [timeLeft, quizData, isSubmitting]);

  const handleSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQIndex] = { selectedOption: optionIndex };
    setAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const formattedAnswers = answers.map((a) =>
        a ? a : { selectedOption: -1 }
      );
      const { data } = await api.post(`/quizzes/${quizData.quizId}/submit`, {
        answers: formattedAnswers,
        timeTaken: quizData.timeLimit - timeLeft,
      });
      navigate(`/quiz/results/${data.result.quizAttemptId}`);
    } catch (error) {
      console.error("Error submitting quiz", error);
      alert("Failed to submit quiz.");
      setIsSubmitting(false);
    }
  };

  if (!quizData)
    return (
      <div className="p-20 text-center text-gray-500">
        Initializing Assessment Protocol...
      </div>
    );

  const currentQuestion = quizData.questions
    ? quizData.questions[currentQIndex]
    : null;
  if (!currentQuestion)
    return (
      <div className="p-20 text-center text-red-500">Error: Missing Data</div>
    );

  const progressPercentage =
    ((currentQIndex + 1) / quizData.totalQuestions) * 100;

  const questionComponents = {
    p: ({ node, ...props }) => <p className="mb-0" {...props} />,
    code: ({ node, ...props }) => (
      <code
        className="bg-gray-800 px-1.5 py-0.5 rounded font-mono text-orange-400 border border-gray-700"
        {...props}
      />
    ),
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 pb-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8 bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
        <div>
          <h2 className="font-bold text-white text-lg">{quizData.title}</h2>
          <div className="flex items-center gap-4 mt-2">
            <div className="h-2 w-48 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-orange-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              Q{currentQIndex + 1} / {quizData.totalQuestions}
            </span>
          </div>
        </div>
        <div
          className={`px-5 py-3 rounded-xl font-mono font-bold text-lg flex items-center gap-3 border ${
            timeLeft < 60
              ? "bg-red-900/20 text-red-500 border-red-900"
              : "bg-gray-800 text-orange-500 border-gray-700"
          }`}
        >
          <Timer size={20} />
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>

      {/* Question Card */}
      <div className="relative bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-800 min-h-[500px] flex flex-col justify-between">
        {isSubmitting && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-20 rounded-3xl border border-gray-800">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-6" />
            <h3 className="text-2xl font-bold text-white">
              Evaluating Performance
            </h3>
            <p className="text-gray-400 mt-2">
              AI is calculating your next difficulty level...
            </p>
          </div>
        )}

        <div>
          <div className="text-2xl md:text-3xl font-medium text-gray-100 mb-10 leading-relaxed font-sans">
            <ReactMarkdown components={questionComponents}>
              {currentQuestion.question}
            </ReactMarkdown>
          </div>

          <div className="grid gap-5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = answers[currentQIndex]?.selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitting}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-5 group ${
                    isSelected
                      ? "border-orange-500 bg-orange-900/10 shadow-lg shadow-orange-900/20"
                      : "border-gray-700 hover:border-gray-500 hover:bg-gray-800"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-600 group-hover:border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 bg-black rounded-full" />
                    )}
                  </div>
                  <div
                    className={`text-lg ${
                      isSelected ? "font-bold text-white" : "text-gray-300"
                    }`}
                  >
                    <ReactMarkdown components={questionComponents}>
                      {opt.text}
                    </ReactMarkdown>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800">
          <button
            onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQIndex === 0 || isSubmitting}
            className="px-8 py-3 text-gray-400 font-bold hover:text-white disabled:opacity-30 transition-colors"
          >
            PREVIOUS
          </button>

          {currentQIndex === quizData.totalQuestions - 1 ? (
            <button
              onClick={submitQuiz}
              disabled={isSubmitting}
              className={`px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-lg transition-transform active:scale-95 ${
                isSubmitting
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500 shadow-green-900/30"
              }`}
            >
              {isSubmitting ? "PROCESSING..." : "SUBMIT MISSION"}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
              disabled={isSubmitting}
              className="bg-orange-600 text-black px-10 py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20"
            >
              NEXT QUESTION
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
