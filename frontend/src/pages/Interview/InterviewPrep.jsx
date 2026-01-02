import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Mic, Send, Play, CheckCircle } from "lucide-react";

const InterviewPrep = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const generateInterview = async () => {
    try {
      setLoading(true);
      const { data } = await api.post(
        `/interviews/subject/${subjectId}/generate`
      );
      // Auto-start the interview after generation
      const startRes = await api.post(`/interviews/${data.interview.id}/start`);
      setInterview(startRes.data.interview);
    } catch (error) {
      console.error("Error generating interview", error);
      alert(
        "Please ensure you have completed all lessons in this subject first."
      );
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;

    // In a real app, this would go to backend for AI analysis
    // For this demo UI, we'll just simulate moving to next question locally
    // unless you implemented the full backend logic

    try {
      const currentQ = interview.questions[currentQuestionIndex];
      await api.post(`/interviews/${interview.id}/answer`, {
        questionId: currentQ.id,
        answer: answer,
        timeTaken: 60, // Mock time
      });

      setAnswer("");

      if (currentQuestionIndex < interview.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        finishInterview();
      }
    } catch (error) {
      console.error("Error submitting answer", error);
    }
  };

  const finishInterview = async () => {
    try {
      const { data } = await api.post(`/interviews/${interview.id}/complete`);
      setFeedback(data.results);
    } catch (error) {
      console.error("Error completing interview", error);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center">
        Generating AI Interview Questions...
      </div>
    );

  if (!interview && !feedback) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-10">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">AI Interview Prep</h1>
          <p className="text-gray-600 mb-8">
            Ready to test your knowledge? Our AI will generate custom questions
            based on your skill level. Speak or type your answers to get instant
            feedback.
          </p>
          <button
            onClick={generateInterview}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Start Interview Session
          </button>
        </div>
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6 text-green-600">
            <CheckCircle className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Interview Completed</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">Total Score</span>
              <span className="text-2xl font-bold text-indigo-600">
                {feedback.totalScore}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="block text-sm text-gray-500">XP Earned</span>
              <span className="text-2xl font-bold text-yellow-600">
                +{feedback.pointsEarned}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold mb-2">AI Feedback</h3>
            <p className="text-gray-700 italic">"{feedback.feedback}"</p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = interview.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-gray-500">
          Question {currentQuestionIndex + 1} of {interview.questions.length}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            question.difficulty === "hard"
              ? "bg-red-100 text-red-700"
              : question.difficulty === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {question.difficulty}
        </span>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-medium mb-2">{question.question}</h2>
        <p className="text-sm text-gray-400">Topic: {question.topic}</p>
      </div>

      <div className="relative">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-48 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
        <button
          onClick={submitAnswer}
          disabled={!answer.trim()}
          className="absolute bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-lg disabled:opacity-50 hover:bg-indigo-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InterviewPrep;
