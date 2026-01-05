import React, { useEffect } from "react";
import { Layout, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      toast.success("Login successful! Redirecting to dashboard...");
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh w-full px-4 py-12 relative overflow-hidden bg-black text-white">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-20 group p-2"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform sm:w-5 sm:h-5"
        />
        <span className="font-medium text-xs sm:text-sm md:text-base">
          Return to Base
        </span>
      </button>
      <div className="bg-gray-900/80 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-3xl shadow-2xl border border-gray-800 w-full max-w-[340px] sm:max-w-sm md:max-w-md text-center relative z-10 backdrop-blur-md">
        <div className="flex justify-center mb-5 sm:mb-6 md:mb-8">
          <div className="bg-gray-800 p-3 sm:p-4 md:p-5 rounded-2xl border border-gray-700 shadow-inner">
            <Layout className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-500" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-400 mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
          Ready to continue your adaptive learning journey?
        </p>
        <button
          onClick={() =>
            (window.location.href = `${
              import.meta.env.VITE_API_URL
            }/auth/google`)
          }
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 sm:py-3.5 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200 font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-orange-900/20 active:scale-95"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
          Continue with Google
        </button>
        <div className="mt-6 sm:mt-8 border-t border-gray-800 pt-5 sm:pt-6">
          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Secure Authentication Protocol
          </p>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default Login;
