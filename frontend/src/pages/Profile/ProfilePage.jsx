import React, { useState, useEffect, useRef } from "react";
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
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";

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
  const [badgeData, setBadgeData] = useState([]);
  const [badgeLoading, setBadgeLoading] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatar(user.avatar);
      fetchBadges();
    }
  }, [user]);

  const fetchBadges = async () => {
    try {
      const { data } = await api.get("/badges/progress");
      setBadgeData(data);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setBadgeLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        return toast.error("Image too large. Please select a file under 1MB.");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({ name, avatar });
      setIsEditing(false);
      toast.success("Identity updated successfully.");
      fetchBadges();
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 pb-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-800 pb-6">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2 leading-tight">
              OPERATIVE <span className="text-orange-500">DOSSIER</span>
            </h1>
            <p className="text-gray-500 font-mono text-[10px] sm:text-xs break-all">
              ID: {user._id} // STATUS: ACTIVE
            </p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full md:w-auto px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold border border-gray-700 transition-all active:scale-95"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-[50px]"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative group mb-6">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-800 overflow-hidden bg-black shadow-xl group-hover:border-orange-500 transition-colors duration-300">
                    <img
                      src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <button
                        onClick={() => fileInputRef.current.click()}
                        type="button"
                        className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-orange-600 p-2.5 sm:p-3 rounded-full text-white shadow-lg hover:bg-orange-500 hover:scale-110 transition-all active:scale-90"
                      >
                        <Upload size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}
                </div>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="text-left">
                      <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Codename
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2.5 sm:py-3 rounded-xl focus:border-orange-500 focus:outline-none font-bold"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setAvatar(user.avatar);
                        }}
                        className="order-2 sm:order-1 flex-1 bg-gray-800 text-gray-300 py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="order-1 sm:order-2 flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 flex justify-center items-center gap-2 active:scale-95 transition-all"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <Save size={18} />
                        )}
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 truncate w-full">
                      {user.name}
                    </h2>
                    <p className="text-orange-500 font-mono text-[10px] sm:text-sm tracking-widest mb-6 uppercase">
                      LEVEL {user.level} OPERATIVE
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                      <div className="bg-black/40 p-3 sm:p-4 rounded-2xl border border-gray-800">
                        <p className="text-gray-500 text-[9px] sm:text-xs uppercase font-bold">
                          Total XP
                        </p>
                        <p className="text-xl sm:text-2xl font-black text-white">
                          {user.points}
                        </p>
                      </div>
                      <div className="bg-black/40 p-3 sm:p-4 rounded-2xl border border-gray-800">
                        <p className="text-gray-500 text-[9px] sm:text-xs uppercase font-bold">
                          Streak
                        </p>
                        <p className="text-xl sm:text-2xl font-black text-orange-500">
                          {user.streak?.current || 0}d
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-yellow-500" size={20} /> Mission Badges
              </h3>

              {badgeLoading ? (
                <div className="text-center py-10 text-gray-500">
                  <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <span className="text-xs uppercase tracking-widest font-mono">
                    Syncing achievements...
                  </span>
                </div>
              ) : badgeData.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-800/20 rounded-2xl border border-dashed border-gray-700">
                  <p className="text-xs sm:text-sm italic">
                    No intelligence data on badges found.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {badgeData.map((item) => {
                    const { badge, earned, progress } = item;
                    const IconComponent =
                      ICON_MAP[badge.icon] || ICON_MAP.default;

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
                        className={`relative p-4 sm:p-6 rounded-2xl border flex flex-col items-center text-center gap-3 transition-all duration-300 group overflow-hidden ${
                          earned
                            ? "bg-gray-800/50 border-gray-700 hover:border-orange-500/50"
                            : "bg-black/40 border-gray-800/50 opacity-60"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-1 ${
                            earned
                              ? "bg-gray-900 shadow-lg"
                              : "bg-gray-900 grayscale"
                          }`}
                        >
                          <IconComponent
                            size={24}
                            className={`${
                              earned ? rarityColor : "text-gray-700"
                            } sm:w-8 sm:h-8`}
                          />
                        </div>

                        <div className="min-w-0">
                          <h4
                            className={`font-bold text-xs sm:text-sm truncate ${
                              earned ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {badge.name}
                          </h4>
                          <p className="hidden sm:block text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {badge.description}
                          </p>
                        </div>

                        {!earned && (
                          <div className="absolute top-2 right-2 text-gray-700">
                            <Lock size={12} />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/90 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity p-4 text-center">
                          {!earned ? (
                            <div className="w-full">
                              <span className="text-orange-500 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 block">
                                LOCKED
                              </span>
                              <div className="w-full bg-gray-800 h-1 sm:h-1.5 rounded-full mb-2">
                                <div
                                  className="bg-orange-500 h-full rounded-full shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                                  style={{ width: `${progress.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-[10px] font-mono">
                                {progress.current}/{progress.target}{" "}
                                {badge.criteria === "points" ? "XP" : ""}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <Award className="text-green-500" size={16} />
                              <span className="text-green-500 font-black text-[10px] sm:text-xs uppercase tracking-wider">
                                UNLOCKED
                              </span>
                            </div>
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
