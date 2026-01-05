import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");

      if (token) {
        try {
          await login(token);
          navigate("/dashboard");
        } catch (error) {
          console.error("Login failed during callback", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  return (
    
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-gray-50 px-4 text-center">
      <div className="relative flex items-center justify-center">
        
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600"></div>

        <span className="sr-only">Processing authentication...</span>
      </div>

      <p className="mt-6 text-gray-600 font-medium text-sm sm:text-base tracking-tight sm:tracking-normal">
        Finalizing your login...
      </p>

      <p className="mt-2 text-gray-400 text-xs">
        This will only take a moment.
      </p>
    </div>
  );
};

export default AuthCallback;
