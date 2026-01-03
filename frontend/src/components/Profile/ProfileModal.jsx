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

  // Function to generate a random avatar if they want to change it
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-black/40">
          <h2 className="text-2xl font-black italic text-white flex items-center gap-2">
            OPERATIVE <span className="text-orange-500">PROFILE</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* --- PROFILE EDIT SECTION --- */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 w-full md:w-auto">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-black shadow-xl group-hover:border-orange-500 transition-colors">
                  <img
                    src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={generateRandomAvatar}
                  type="button"
                  className="absolute bottom-0 right-0 bg-orange-600 p-2.5 rounded-full text-white shadow-lg hover:bg-orange-500 hover:scale-110 transition-all"
                  title="Generate Random Avatar"
                >
                  <Camera size={18} />
                </button>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                  Level {user.level}
                </p>
                <p className="text-orange-500 font-bold text-sm">
                  {user.points} XP
                </p>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex-1 w-full space-y-5">
              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                  Codename
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-bold"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-mono"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-600 mt-2">
                  Click the camera icon to generate a random look.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Save size={20} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="h-px bg-gray-800 w-full"></div>

          {/* --- BADGES SECTION --- */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="text-yellow-500" />
              Achievements & Badges
            </h3>

            {!user.badges || user.badges.length === 0 ? (
              <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-gray-600" size={32} />
                </div>
                <p className="text-gray-400 font-medium">
                  No Intel Acquired Yet
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Complete lessons and quizzes to earn badges.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {user.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all hover:-translate-y-1 hover:bg-gray-800"
                  >
                    {/* Badge Icon */}
                    <div className="w-16 h-16 relative">
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className="w-full h-full object-contain relative z-10 drop-shadow-lg"
                      />
                    </div>

                    {/* Badge Name */}
                    <div className="text-center">
                      <p className="text-white font-bold text-sm leading-tight group-hover:text-orange-400 transition-colors">
                        {badge.name}
                      </p>
                    </div>

                    {/* Tooltip (Description) */}
                    {badge.description && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-black border border-gray-700 text-gray-300 text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-2xl">
                        {badge.description}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
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
