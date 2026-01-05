import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      /* Responsive centering: 
         - min-h-screen: Ensures it covers at least the full viewport
         - p-4: Adds breathing room on small mobile screens
      */
      <div className="flex justify-center items-center min-h-screen w-full bg-black p-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-indigo-600"></div>

          {/* Optional: Accessibility/Reader text */}
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
