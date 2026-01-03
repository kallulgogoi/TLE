import React, { useEffect } from "react";
import { Layout, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 relative overflow-hidden bg-black text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-20 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-medium text-sm md:text-base">Return to Base</span>
      </button>
      {/* Login Card */}
      <div className="bg-gray-900/80 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-800 w-full max-w-sm md:max-w-md text-center relative z-10 backdrop-blur-md">
        {/* Icon Header */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="bg-gray-800 p-4 md:p-5 rounded-2xl border border-gray-700 shadow-inner">
            <Layout className="w-10 h-10 md:w-12 md:h-12 text-orange-500" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-400 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
          Ready to continue your adaptive learning journey?
        </p>

        {/* Google Login Button */}
        <button
          onClick={() =>
            (window.location.href = `${
              import.meta.env.VITE_API_URL
            }/auth/google`)
          }
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3.5 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200 font-bold text-base md:text-lg shadow-lg hover:shadow-orange-900/20 hover:-translate-y-1 active:scale-95"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 md:w-6 md:h-6"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-800 pt-6">
          <p className="text-[10px] md:text-xs text-gray-600 font-bold uppercase tracking-[0.2em]">
            Secure Authentication Protocol
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
