import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, LayoutDashboard, BookOpen, Edit2, Trophy } from "lucide-react";
import ProfileModal from "../Profile/ProfileModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 sticky top-0 z-50 shadow-lg shadow-black/50">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="bg-orange-600 p-2 rounded-lg group-hover:bg-orange-500 transition-colors">
              <span className="text-black font-bold text-xl">GL</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block text-white">
              GamifiedLearning
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Nav Links */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Trophy size={18} />
              <span className="hidden sm:inline font-medium">Leaderboard</span>
            </Link>
            <Link
              to="/subjects"
              className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline font-medium">Subjects</span>
            </Link>

            <div className="h-6 w-px bg-gray-700 mx-2"></div>

            {/* User Profile Section */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-xs text-orange-500 font-medium">
                  Lvl {user.level} • {user.points} XP
                </p>
              </div>

              {/* Clickable Profile Pic */}
              <button
                onClick={() => setIsProfileOpen(true)}
                className="relative group focus:outline-none"
                title="Edit Profile"
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  className="w-10 h-10 rounded-full border-2 border-orange-600/50 group-hover:border-orange-500 transition-colors object-cover"
                  alt="Profile"
                />
                {/* Edit Overlay Icon */}
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit2 size={14} className="text-white" />
                </div>
              </button>

              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Render Modal if Open */}
      {isProfileOpen && (
        <ProfileModal onClose={() => setIsProfileOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
