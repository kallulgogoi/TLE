import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Trophy, Crown, Medal, Flame } from "lucide-react";
import toast from "react-hot-toast";

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/users/leaderboard?limit=50`);
      setLeaders(data);
    } catch (error) {
      console.error("Leaderboard error:", error);
      toast.error("Failed to load rankings");
    } finally {
      setLoading(false);
    }
  };

  const getRankStyle = (index) => {
    if (index === 0)
      return "border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)] bg-gradient-to-b from-yellow-900/20 to-black";
    if (index === 1)
      return "border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.2)] bg-gradient-to-b from-gray-800/40 to-black";
    if (index === 2)
      return "border-orange-700 shadow-[0_0_20px_rgba(194,65,12,0.2)] bg-gradient-to-b from-orange-900/20 to-black";
    return "border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-colors";
  };

  const getTrophyIcon = (index) => {
    if (index === 0)
      return (
        <Crown className="text-yellow-500 w-6 h-6 sm:w-8 sm:h-8 mb-1 animate-bounce" />
      );
    if (index === 1)
      return <Medal className="text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />;
    if (index === 2)
      return <Medal className="text-orange-600 w-5 h-5 sm:w-6 sm:h-6" />;
    return null;
  };

  const showPodium = leaders.length >= 3;

  if (loading)
    return (
      <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-500 font-mono text-xs sm:text-sm animate-pulse tracking-widest">
            SYNCING GLOBAL RANKS...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:p-8 pb-24 font-sans overflow-x-hidden">
      {/* Header - Scaled for Mobile/Laptop */}
      <div className="max-w-4xl mx-auto mb-10 sm:mb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-32 bg-orange-600/10 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />
          GLOBAL RANKINGS
        </h1>
        <p className="text-gray-500 sm:text-gray-400 text-sm sm:text-lg max-w-md mx-auto">
          Elite operatives ranked by total experience points.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Top 3 Podium - Hidden on Mobile, Flex on Laptop (md+) */}
        {showPodium && (
          <div className="hidden md:flex justify-center items-end gap-4 lg:gap-8 mb-20 h-72">
            {/* Rank 2 */}
            <div className="w-40 lg:w-48 text-center relative group">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl border-4 border-gray-400 overflow-hidden shadow-2xl relative z-10 group-hover:scale-105 transition-transform">
                  <img
                    src={
                      leaders[1].avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${leaders[1]._id}`
                    }
                    alt="Rank 2"
                    className="w-full h-full object-cover bg-gray-800"
                  />
                </div>
              </div>
              <div className="h-40 bg-gradient-to-t from-gray-900 to-gray-800/30 rounded-t-3xl border-t border-x border-gray-700 flex flex-col justify-end p-4 relative">
                <div className="text-2xl font-black text-gray-500 mb-1">#2</div>
                <div className="text-white font-bold truncate text-sm lg:text-base">
                  {leaders[1].name}
                </div>
                <div className="text-orange-400 font-mono text-xs lg:text-sm">
                  {leaders[1].points.toLocaleString()} PTS
                </div>
              </div>
            </div>

            {/* Rank 1 - Larger and taller */}
            <div className="w-48 lg:w-56 text-center relative z-20 group">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Crown className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-500 mb-2 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse" />
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl border-4 border-yellow-500 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.2)] relative z-10 group-hover:scale-110 transition-transform">
                  <img
                    src={
                      leaders[0].avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${leaders[0]._id}`
                    }
                    alt="Rank 1"
                    className="w-full h-full object-cover bg-gray-800"
                  />
                </div>
              </div>
              <div className="h-56 bg-gradient-to-t from-yellow-900/20 to-gray-900 rounded-t-3xl border-t border-x border-yellow-500/30 flex flex-col justify-end p-6 relative shadow-[0_0_50px_rgba(234,179,8,0.05)]">
                <div className="text-4xl lg:text-5xl font-black text-yellow-500/10 absolute top-4 right-4">
                  #1
                </div>
                <div className="text-lg lg:text-xl font-bold text-white truncate mb-1">
                  {leaders[0].name}
                </div>
                <div className="text-yellow-400 font-mono font-bold text-base lg:text-lg">
                  {leaders[0].points.toLocaleString()} PTS
                </div>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="w-40 lg:w-48 text-center relative group">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl border-4 border-orange-700 overflow-hidden shadow-2xl relative z-10 group-hover:scale-105 transition-transform">
                  <img
                    src={
                      leaders[2].avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${leaders[2]._id}`
                    }
                    alt="Rank 3"
                    className="w-full h-full object-cover bg-gray-800"
                  />
                </div>
              </div>
              <div className="h-32 bg-gradient-to-t from-gray-900 to-gray-800/30 rounded-t-3xl border-t border-x border-gray-700 flex flex-col justify-end p-4 relative">
                <div className="text-2xl font-black text-orange-900 mb-1">
                  #3
                </div>
                <div className="text-white font-bold truncate text-sm lg:text-base">
                  {leaders[2].name}
                </div>
                <div className="text-orange-400 font-mono text-xs lg:text-sm">
                  {leaders[2].points.toLocaleString()} PTS
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List of Players - Fully Responsive Card List */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {leaders.map((player, index) => {
            const isMe = user && player._id === user._id;
            const isTopThree = index < 3;

            // On desktop (md+), we hide the top 3 from the list because the podium is visible
            const shouldHideFromList =
              showPodium &&
              isTopThree &&
              typeof window !== "undefined" &&
              window.innerWidth >= 768;

            if (shouldHideFromList) return null;

            return (
              <div
                key={player._id}
                className={`relative flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all active:scale-[0.98] sm:hover:scale-[1.01] ${
                  isMe
                    ? "bg-orange-900/20 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                    : getRankStyle(index)
                }`}
              >
                {/* Rank Number */}
                <div
                  className={`w-8 sm:w-12 text-center font-black text-sm sm:text-xl ${
                    isTopThree ? "text-white" : "text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Avatar and Badge */}
                <div className="flex-shrink-0 relative mr-3 sm:mr-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden bg-gray-800 border ${
                      isTopThree ? "border-white/20" : "border-transparent"
                    }`}
                  >
                    <img
                      src={
                        player.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${player._id}`
                      }
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating Trophy Icon for mobile top ranks */}
                  {isTopThree && (
                    <div className="absolute -top-2 -right-2 md:hidden">
                      {getTrophyIcon(index)}
                    </div>
                  )}
                </div>

                {/* Player Name and Streak */}
                <div className="flex-grow min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
                    <h3
                      className={`font-bold text-sm sm:text-lg truncate ${
                        isMe ? "text-orange-400" : "text-white"
                      }`}
                    >
                      {player.name}{" "}
                      {isMe && (
                        <span className="text-[10px] sm:text-xs opacity-60">
                          (YOU)
                        </span>
                      )}
                    </h3>
                    {player.streak?.current > 3 && (
                      <span className="flex items-center w-fit text-[9px] sm:text-xs text-orange-500 bg-orange-900/30 px-1.5 py-0.5 rounded border border-orange-900/50">
                        <Flame size={10} className="mr-1 fill-orange-500" />
                        {player.streak.current}
                      </span>
                    )}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="font-black text-sm sm:text-xl text-white tracking-tight leading-none">
                    {player.points.toLocaleString()}
                  </div>
                  <div className="text-[9px] sm:text-xs text-gray-600 font-bold tracking-widest uppercase">
                    PTS
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
