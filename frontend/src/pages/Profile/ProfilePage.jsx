import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
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
} from "lucide-react";
import toast from "react-hot-toast";

// --- SYSTEM BADGES CONFIGURATION ---
// Defines all possible badges users can see (Locked vs Unlocked)
const SYSTEM_BADGES = [
  {
    id: 1,
    name: "Recruit",
    minPoints: 0,
    icon: User,
    color: "text-gray-400",
    desc: "Welcome to the agency.",
  },
  {
    id: 2,
    name: "Scout",
    minPoints: 100,
    icon: Target,
    color: "text-blue-400",
    desc: "First 100 XP earned.",
  },
  {
    id: 3,
    name: "Operative",
    minPoints: 500,
    icon: Zap,
    color: "text-yellow-400",
    desc: "500 XP. Getting serious.",
  },
  {
    id: 4,
    name: "Veteran",
    minPoints: 1000,
    icon: Shield,
    color: "text-orange-500",
    desc: "1000 XP. Battle hardened.",
  },
  {
    id: 5,
    name: "Elite",
    minPoints: 2500,
    icon: Hexagon,
    color: "text-red-500",
    desc: "2500 XP. Top 1% talent.",
  },
  {
    id: 6,
    name: "Legend",
    minPoints: 5000,
    icon: Trophy,
    color: "text-purple-500",
    desc: "5000 XP. The master algorithm.",
  },
];

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  // Sync state if user reloads
  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatar(user.avatar);
    }
  }, [user]);

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
              {/* Background Decoration */}
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

                    {/* Stats Grid */}
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

          {/* --- RIGHT COLUMN: BADGES & ACHIEVEMENTS --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="text-orange-500" /> Clearance Level Progress
              </h3>
              {/* Find current next badge */}
              {(() => {
                const nextBadge = SYSTEM_BADGES.find(
                  (b) => user.points < b.minPoints
                );
                const currentBadge =
                  [...SYSTEM_BADGES]
                    .reverse()
                    .find((b) => user.points >= b.minPoints) ||
                  SYSTEM_BADGES[0];
                const progress = nextBadge
                  ? ((user.points - currentBadge.minPoints) /
                      (nextBadge.minPoints - currentBadge.minPoints)) *
                    100
                  : 100;

                return (
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className={currentBadge.color}>
                        {currentBadge.name}
                      </span>
                      <span className="text-gray-500">
                        {nextBadge ? nextBadge.name : "MAX RANK"}
                      </span>
                    </div>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-1000"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-2 font-mono">
                      {nextBadge
                        ? `${nextBadge.minPoints - user.points} XP TO PROMOTION`
                        : "MAXIMUM CLEARANCE ACHIEVED"}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Badges Grid */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-yellow-500" /> Mission Badges
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SYSTEM_BADGES.map((badge) => {
                  const isUnlocked = user.points >= badge.minPoints;
                  const Icon = badge.icon;

                  return (
                    <div
                      key={badge.id}
                      className={`relative p-6 rounded-2xl border flex flex-col items-center text-center gap-3 transition-all duration-300 ${
                        isUnlocked
                          ? "bg-gray-800/50 border-gray-700 hover:border-orange-500/50 hover:bg-gray-800"
                          : "bg-black/40 border-gray-800 opacity-60"
                      }`}
                    >
                      {/* Icon Container */}
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                          isUnlocked
                            ? "bg-gray-900 shadow-lg"
                            : "bg-gray-900 grayscale"
                        }`}
                      >
                        <Icon
                          size={32}
                          className={isUnlocked ? badge.color : "text-gray-600"}
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <h4
                          className={`font-bold ${
                            isUnlocked ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {badge.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {badge.desc}
                        </p>
                      </div>

                      {/* Lock Overlay */}
                      {!isUnlocked && (
                        <div className="absolute top-3 right-3 text-gray-600">
                          <Lock size={16} />
                        </div>
                      )}

                      {/* XP Requirement Label (if locked) */}
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl opacity-0 hover:opacity-100 transition-opacity">
                          <span className="bg-black border border-gray-700 text-orange-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <Lock size={10} /> {badge.minPoints} XP
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
