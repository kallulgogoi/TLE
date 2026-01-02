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
      // Fetch ranking without time filters
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
      return "border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)] bg-gradient-to-b from-yellow-900/20 to-black";
    if (index === 1)
      return "border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.3)] bg-gradient-to-b from-gray-800/40 to-black";
    if (index === 2)
      return "border-orange-700 shadow-[0_0_20px_rgba(194,65,12,0.3)] bg-gradient-to-b from-orange-900/20 to-black";
    return "border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-colors";
  };

  const getTrophyIcon = (index) => {
    if (index === 0)
      return <Crown className="text-yellow-500 w-8 h-8 mb-2 animate-bounce" />;
    if (index === 1) return <Medal className="text-gray-300 w-6 h-6 mb-2" />;
    if (index === 2) return <Medal className="text-orange-600 w-6 h-6 mb-2" />;
    return null;
  };

  //Only show Podium if we have at least 3 players
  const showPodium = leaders.length >= 3;

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-orange-500 font-mono animate-pulse">
            SYNCING GLOBAL RANKS...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pb-24 font-sans">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-orange-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4 flex items-center justify-center gap-4">
          <Trophy className="w-12 h-12 text-orange-500" />
          GLOBAL RANKINGS
        </h1>
        <p className="text-gray-400 text-lg">
          Elite operatives ranked by total experience points.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Top 3 Podium - Only render if 3 or more users */}
        {showPodium && (
          <div className="hidden md:flex justify-center items-end gap-6 mb-16 h-64">
            {/* Rank 2 */}
            <div className="w-48 text-center relative group">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl border-4 border-gray-400 overflow-hidden shadow-2xl relative z-10 group-hover:scale-110 transition-transform">
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
                <div className="text-3xl font-black text-gray-500 mb-1">#2</div>
                <div className="text-white font-bold truncate">
                  {leaders[1].name}
                </div>
                <div className="text-orange-400 font-mono text-sm">
                  {leaders[1].points.toLocaleString()} PTS
                </div>
              </div>
            </div>

            {/* Rank 1 */}
            <div className="w-56 text-center relative z-20 group">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Crown className="w-10 h-10 text-yellow-500 mb-2 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse" />
                <div className="w-24 h-24 rounded-2xl border-4 border-yellow-500 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.3)] relative z-10 group-hover:scale-110 transition-transform">
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
              <div className="h-56 bg-gradient-to-t from-yellow-900/20 to-gray-900 rounded-t-3xl border-t border-x border-yellow-500/30 flex flex-col justify-end p-6 relative shadow-[0_0_50px_rgba(234,179,8,0.1)]">
                <div className="text-5xl font-black text-yellow-500/20 absolute top-4 right-4">
                  #1
                </div>
                <div className="text-xl font-bold text-white truncate mb-1">
                  {leaders[0].name}
                </div>
                <div className="text-yellow-400 font-mono font-bold text-lg">
                  {leaders[0].points.toLocaleString()} PTS
                </div>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="w-48 text-center relative group">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl border-4 border-orange-700 overflow-hidden shadow-2xl relative z-10 group-hover:scale-110 transition-transform">
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
                <div className="text-3xl font-black text-orange-900 mb-1">
                  #3
                </div>
                <div className="text-white font-bold truncate">
                  {leaders[2].name}
                </div>
                <div className="text-orange-400 font-mono text-sm">
                  {leaders[2].points.toLocaleString()} PTS
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List of Players */}
        <div className="flex flex-col gap-3">
          {leaders.map((player, index) => {
            const isMe = user && player._id === user._id;
            // If < 3 players, podium is hidden, so show everyone in list.
            if (showPodium && window.innerWidth >= 768 && index < 3)
              return null;

            return (
              <div
                key={player._id}
                className={`relative flex items-center p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
                  isMe
                    ? "bg-orange-900/20 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                    : getRankStyle(index)
                }`}
              >
                <div className="w-12 text-center font-black text-xl text-gray-500">
                  {index + 1}
                </div>
                <div className="flex-shrink-0 relative mr-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800">
                    <img
                      src={
                        player.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${player._id}`
                      }
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Show Crown Icon in list only if Podium is NOT visible (mobile or low user count) */}
                  {(!showPodium || window.innerWidth < 768) && index < 3 && (
                    <div className="absolute -top-2 -right-2">
                      {getTrophyIcon(index)}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-bold text-lg ${
                        isMe ? "text-orange-400" : "text-white"
                      }`}
                    >
                      {player.name} {isMe && "(You)"}
                    </h3>
                    {player.streak?.current > 3 && (
                      <span className="flex items-center text-xs text-orange-500 bg-orange-900/30 px-2 py-0.5 rounded border border-orange-900/50">
                        <Flame size={10} className="mr-1 fill-orange-500" />{" "}
                        {player.streak.current}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xl text-white tracking-tight">
                    {player.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 font-bold tracking-widest">
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
