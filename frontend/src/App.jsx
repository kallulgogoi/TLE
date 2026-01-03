import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Navbar from "./components/Layout/Navbar";

// Pages
import Login from "./pages/Auth/Login";
import AuthCallback from "./pages/Auth/AuthCallback";
import Dashboard from "./pages/Dashboard/Dashboard";
import Leaderboard from "./pages/Dashboard/Leaderboard";
import SubjectDashboard from "./pages/Subject/SubjectDashboard";
import SubjectList from "./pages/Subject/SubjectList";
import InterviewPrep from "./pages/Interview/InterviewPrep";
import LessonView from "./pages/Lesson/LessonView";
import QuizView from "./pages/Quiz/QuizView";
import QuizResult from "./pages/Quiz/QuizResult";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import InterviewReview from "./pages/Interview/InterviewReview";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid #374151",
            },
            success: {
              iconTheme: {
                primary: "#f97316",
                secondary: "#fff",
              },
            },
          }}
        />

        <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-orange-500 selection:text-white">
          <Navbar />
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/subjects" element={<SubjectList />} />
                <Route
                  path="/interview/:interviewId"
                  element={<InterviewPrep />}
                />
                <Route
                  path="/interview/review/:id"
                  element={<InterviewReview />}
                />
                <Route
                  path="/subject/:subjectId/dashboard"
                  element={<SubjectDashboard />}
                />
                <Route path="/lesson/:id" element={<LessonView />} />
                <Route path="/quiz/start/:lessonId" element={<QuizView />} />
                <Route
                  path="/quiz/results/:attemptId"
                  element={<QuizResult />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
