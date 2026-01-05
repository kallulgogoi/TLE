import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { X, Camera, Save, Loader2, Award, Shield } from "lucide-react";
import toast from "react-hot-toast";

const ProfileModal = ({ onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({ name, avatar });
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Modal Container: Max height adjusted for mobile browsing bars */}
      <div className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Header: Responsive text and padding */}
        <div className="p-4 sm:p-6 border-b border-gray-800 flex justify-between items-center bg-black/40">
          <h2 className="text-lg sm:text-2xl font-black italic text-white flex items-center gap-2">
            OPERATIVE <span className="text-orange-500">PROFILE</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-10 custom-scrollbar">
          {/* --- PROFILE EDIT SECTION --- */}
          {/* Stacks on mobile, Side-by-side on Tablet (md: 768px+) */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 w-full md:w-auto">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-black shadow-xl group-hover:border-orange-500 transition-colors">
                  <img
                    src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={generateRandomAvatar}
                  type="button"
                  className="absolute bottom-0 right-0 bg-orange-600 p-2 sm:p-2.5 rounded-full text-white shadow-lg hover:bg-orange-500 hover:scale-110 transition-all"
                >
                  <Camera size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-[10px] sm:text-xs font-mono uppercase tracking-widest">
                  Level {user.level}
                </p>
                <p className="text-orange-500 font-bold text-xs sm:text-sm">
                  {user.points} XP
                </p>
              </div>
            </div>

            {/* Form Section */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 w-full space-y-4 sm:space-y-6"
            >
              <div className="space-y-2">
                <label className="block text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center md:text-left">
                  Codename
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-bold text-sm sm:text-base"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center md:text-left">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 text-xs sm:text-sm font-mono"
                  placeholder="https://..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Save size={18} />
                    <span className="text-sm sm:text-base">Save Changes</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="h-px bg-gray-800 w-full"></div>

          {/* --- BADGES SECTION --- */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Award className="text-yellow-500" size={20} />
              Achievements & Badges
            </h3>

            {!user.badges || user.badges.length === 0 ? (
              <div className="bg-gray-800/30 border border-gray-800 border-dashed rounded-2xl p-6 sm:p-10 text-center">
                <Shield className="text-gray-700 mx-auto mb-3" size={32} />
                <p className="text-gray-400 font-medium text-sm sm:text-base">
                  No Intel Acquired Yet
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
                  Complete lessons to earn badges.
                </p>
              </div>
            ) : (
              /* Grid Logic: 2 cols (mobile) -> 3 cols (small tablet) -> 4 cols (large tablet/desktop) */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {user.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 transition-all"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                      <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className="w-full h-full object-contain relative z-10"
                      />
                    </div>
                    <p className="text-white font-bold text-[10px] sm:text-xs text-center leading-tight">
                      {badge.name}
                    </p>

                    {/* Tooltip: Only visible on devices that support hover (Desktops/Tablets with trackpads) */}
                    {badge.description && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 sm:w-48 bg-black border border-gray-700 text-gray-300 text-[10px] p-2 rounded-lg opacity-0 pointer-events-none group-hover:md:opacity-100 transition-opacity z-20">
                        {badge.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
