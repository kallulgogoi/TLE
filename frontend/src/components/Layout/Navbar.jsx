import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  BookOpen,
  Edit2,
  Trophy,
  Menu,
  X,
  User,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={18} /> },
    { name: "Subjects", path: "/subjects", icon: <BookOpen size={18} /> },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg shadow-black/50">
      {/* Container with responsive padding for Mobile, Tablet, and Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">
              Padho<span className="text-orange-500">.AI</span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation (768px and up) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-900/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {link.icon}
                <span className="font-medium text-sm lg:text-base">
                  {link.name}
                </span>
              </Link>
            ))}

            <div className="h-6 w-px bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-3 lg:gap-4">
              {/* User Info - Hidden on smaller tablets to prevent crowding */}
              <div className="hidden lg:block text-right">
                <p className="text-sm font-bold text-white leading-none">
                  {user.name}
                </p>
                <p className="text-xs text-orange-500 font-medium mt-1">
                  Lvl {user.level} • {user.points} XP
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="relative group focus:outline-none flex-shrink-0"
                title="View Profile"
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-700 group-hover:border-orange-500 transition-colors object-cover"
                  alt="Profile"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <User size={14} className="text-white" />
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

          {/* Mobile Navigation Controls (Below 768px) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="p-1 focus:outline-none"
            >
              <img
                src={
                  user.avatar || `https://ui-avatars.com/api/?name=${user.name}`
                }
                className="w-8 h-8 rounded-full border border-gray-600 object-cover"
                alt="Profile"
              />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 overflow-hidden">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <div className="flex items-center gap-3 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex-1">
                <p className="text-white font-bold text-lg leading-tight">
                  {user.name}
                </p>
                <p className="text-orange-500 text-sm font-mono mt-1">
                  Level {user.level} • {user.points} XP
                </p>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(link.path)
                    ? "bg-orange-600 text-white font-bold"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.icon}
                <span className="text-base">{link.name}</span>
              </Link>
            ))}

            <div className="border-t border-gray-800 my-4 pt-4">
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl"
              >
                <User size={18} /> <span className="text-base">My Profile</span>
              </button>
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl mt-2"
              >
                <LogOut size={18} /> <span className="text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
