import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Camera,
  Save,
  Loader2,
  Award,
  Shield,
  Lock,
  Trophy,
  Zap,
  Target,
  Hexagon,
  User,
  Star,
  Flame,
} from "lucide-react";
import toast from "react-hot-toast";

// Map backend icon strings to React Components
const ICON_MAP = {
  user: User,
  target: Target,
  zap: Zap,
  shield: Shield,
  hexagon: Hexagon,
  trophy: Trophy,
  star: Star,
  flame: Flame,
  default: Award,
};

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  // State for dynamic badges
  const [badgeData, setBadgeData] = useState([]);
  const [badgeLoading, setBadgeLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatar(user.avatar);
      fetchBadges();
    }
  }, [user]);

  const fetchBadges = async () => {
    try {
      // Fetches all badges + progress status
      const { data } = await api.get("/badges/progress");
      setBadgeData(data);
    } catch (error) {
      console.error("Error fetching badges:", error);
      // Don't toast error here to keep UI clean, just log it
    } finally {
      setBadgeLoading(false);
    }
  };

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({ name, avatar });
      setIsEditing(false);
      toast.success("Identity updated successfully.");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pb-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
              OPERATIVE <span className="text-orange-500">DOSSIER</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              ID: {user._id} // STATUS: ACTIVE
            </p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold border border-gray-700 transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: IDENTITY CARD --- */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-[50px]"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative group mb-6">
                  <div className="w-40 h-40 rounded-full border-4 border-gray-800 overflow-hidden bg-black shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-orange-500 transition-colors duration-300">
                    <img
                      src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <button
                      onClick={generateRandomAvatar}
                      type="button"
                      className="absolute bottom-2 right-2 bg-orange-600 p-3 rounded-full text-white shadow-lg hover:bg-orange-500 hover:scale-110 transition-all"
                      title="Generate New Look"
                    >
                      <Camera size={20} />
                    </button>
                  )}
                </div>

                {/* Info / Edit Form */}
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        Codename
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-orange-500 focus:outline-none font-bold"
                      />
                    </div>
                    <div className="text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-gray-400 px-4 py-3 rounded-xl focus:border-orange-500 focus:outline-none text-xs font-mono"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-800 text-gray-300 py-3 rounded-xl font-bold hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 flex justify-center items-center gap-2"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Save size={18} />
                        )}{" "}
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {user.name}
                    </h2>
                    <p className="text-orange-500 font-mono text-sm tracking-widest mb-6">
                      LEVEL {user.level} OPERATIVE
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-black/40 p-4 rounded-2xl border border-gray-800">
                        <p className="text-gray-500 text-xs uppercase font-bold">
                          Total XP
                        </p>
                        <p className="text-2xl font-black text-white">
                          {user.points}
                        </p>
                      </div>
                      <div className="bg-black/40 p-4 rounded-2xl border border-gray-800">
                        <p className="text-gray-500 text-xs uppercase font-bold">
                          Streak
                        </p>
                        <p className="text-2xl font-black text-orange-500">
                          {user.streak?.current || 0} Days
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: DYNAMIC BADGES --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Grid */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-yellow-500" /> Mission Badges
              </h3>

              {badgeLoading ? (
                <div className="text-center py-10 text-gray-500">
                  <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
                  Syncing achievements...
                </div>
              ) : badgeData.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-gray-800/30 rounded-2xl border border-dashed border-gray-700">
                  No badges configured in system.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {badgeData.map((item) => {
                    const { badge, earned, progress } = item;
                    const IconComponent =
                      ICON_MAP[badge.icon] || ICON_MAP.default;

                    // Determine rarity color
                    const rarityColor =
                      badge.rarity === "legendary"
                        ? "text-purple-500"
                        : badge.rarity === "epic"
                        ? "text-orange-500"
                        : badge.rarity === "rare"
                        ? "text-blue-400"
                        : "text-gray-400";

                    return (
                      <div
                        key={badge._id}
                        className={`relative p-6 rounded-2xl border flex flex-col items-center text-center gap-3 transition-all duration-300 group ${
                          earned
                            ? "bg-gray-800/50 border-gray-700 hover:border-orange-500/50 hover:bg-gray-800"
                            : "bg-black/40 border-gray-800 opacity-60"
                        }`}
                      >
                        {/* Icon Container */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                            earned
                              ? "bg-gray-900 shadow-lg"
                              : "bg-gray-900 grayscale"
                          }`}
                        >
                          <IconComponent
                            size={32}
                            className={earned ? rarityColor : "text-gray-600"}
                          />
                        </div>

                        {/* Info */}
                        <div>
                          <h4
                            className={`font-bold ${
                              earned ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {badge.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {badge.description}
                          </p>
                        </div>

                        {/* Lock Overlay */}
                        {!earned && (
                          <div className="absolute top-3 right-3 text-gray-600">
                            <Lock size={16} />
                          </div>
                        )}

                        {/* Requirement Label (Hover Effect) */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-2xl opacity-0 hover:opacity-100 transition-opacity p-4">
                          {!earned ? (
                            <>
                              <span className="text-orange-500 text-xs font-bold uppercase mb-1">
                                Locked
                              </span>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2">
                                <div
                                  className="bg-orange-500 h-1.5 rounded-full"
                                  style={{ width: `${progress.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-xs">
                                {progress.current} / {progress.target}{" "}
                                {badge.criteria === "points" ? "XP" : ""}
                              </span>
                            </>
                          ) : (
                            <span className="text-green-500 font-bold text-sm flex items-center gap-1">
                              <Award size={14} /> UNLOCKED
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
