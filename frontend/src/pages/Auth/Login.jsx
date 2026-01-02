import React, { useEffect } from "react";
import { Layout } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-800 w-full max-w-md text-center relative z-10 backdrop-blur-sm">
        {/* Icon Header */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-inner">
            <Layout className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-4xl font-extrabold mb-3 text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-400 mb-10 text-lg leading-relaxed">
          Ready to continue your adaptive learning journey?
        </p>

        {/* Google Login Button */}
        <button
          onClick={() =>
            (window.location.href = `${
              import.meta.env.VITE_API_URL
            }/auth/google`)
          }
          className="w-full flex items-center justify-center gap-4 bg-white text-gray-900 p-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-orange-900/20 hover:-translate-y-1"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
            Secure Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
