import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Trophy, Crown, Medal, Flame, Shield } from "lucide-react";
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
      console.error(error);
      toast.error("Failed to load rankings");
    } finally {
      setLoading(false);
    }
  };

  const getRankStyles = (rank, isMe) => {
    const base =
      "relative flex items-center p-4 rounded-2xl border transition-all active:scale-[0.98]";

    if (rank === 0) {
      return `${base} bg-gradient-to-r from-yellow-900/40 to-black border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.1)] mb-3`;
    }
    if (rank === 1) {
      return `${base} bg-gradient-to-r from-gray-800/60 to-black border-gray-400/50 mb-3`;
    }
    if (rank === 2) {
      return `${base} bg-gradient-to-r from-orange-900/70 to-black border-orange-600/50 mb-3`;
    }

    return `${base} ${
      isMe
        ? "bg-orange-900/10 border-orange-500/30"
        : "bg-gray-900/40 border-gray-800"
    } mb-2 hover:bg-gray-800`;
  };

  const PodiumSpot = ({ player, rank }) => {
    const isFirst = rank === 1;
    const color = rank === 1 ? "yellow" : rank === 2 ? "gray" : "orange";
    const height = rank === 1 ? "h-50" : "h-30";
    const mt = rank === 1 ? "-mt-12" : "";

    return (
      <div className={`relative flex flex-col items-center justify-end ${mt}`}>
        <div className="relative group cursor-pointer z-20">
          <div
            className={`absolute -inset-1 rounded-full bg-linear-to-b from-transparent via-${color}-500 to-transparent opacity-30 blur-sm`}
          ></div>
          <div
            className={`relative w-24 h-24 rounded-full border-2 border-${color}-500 p-1 bg-black overflow-hidden shadow-2xl`}
          >
            <img
              src={
                player.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${player._id}`
              }
              alt={player.name}
              className="w-full h-full rounded-full object-cover bg-gray-900"
            />
          </div>
          <div
            className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center bg-black border border-${color}-500 rounded-full text-white font-bold text-sm`}
          >
            {rank}
          </div>
        </div>

        <div className="text-center mt-6 mb-3 z-10">
          <h3
            className={`font-bold text-lg truncate max-w-35 text-${color}-400`}
          >
            {player.name}
          </h3>
          <div className="font-mono text-xs text-gray-400">
            <span className="text-white font-bold text-sm">
              {player.points.toLocaleString()}
            </span>{" "}
            PTS
          </div>
        </div>

        <div
          className={`w-36 ${height} rounded-t-2xl border-t border-x border-${color}-500/20 bg-linear-to-b from-${color}-500/10 to-transparent backdrop-blur-sm relative`}
        ></div>
      </div>
    );
  };

  if (loading)
    return (
      <div className="min-h-dvh bg-black text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 md:p-8 font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter flex items-center justify-center gap-3 mb-2">
          <Trophy className="w-8 h-8 md:w-12 md:h-12 text-orange-500" />
          RANKINGS
        </h1>
        <p className="text-gray-500 text-xs md:text-sm">
          Global Elite Operatives
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {leaders.length >= 3 && (
          <div className="hidden md:flex justify-center items-end gap-6 mb-20 px-4 min-h-100">
            <PodiumSpot player={leaders[1]} rank={2} />
            <PodiumSpot player={leaders[0]} rank={1} />
            <PodiumSpot player={leaders[2]} rank={3} />
          </div>
        )}

        <div className="flex flex-col">
          {leaders.map((player, index) => {
            const isMe = user && player._id === user._id;
            const rank = index + 1;
            const isTop3 = index < 3;

            return (
              <div
                key={player._id}
                className={`${isTop3 ? "md:hidden" : ""} ${getRankStyles(
                  index,
                  isMe
                )}`}
              >
                <div className="w-8 text-center font-black text-lg text-gray-500 shrink-0">
                  {rank === 1 ? (
                    <span className="text-2xl">👑</span>
                  ) : rank === 2 ? (
                    <span className="text-xl">🥈</span>
                  ) : rank === 3 ? (
                    <span className="text-xl">🥉</span>
                  ) : (
                    `#${rank}`
                  )}
                </div>

                <div className="shrink-0 mx-3">
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden bg-gray-800 border-2 ${
                      rank === 1
                        ? "border-yellow-500"
                        : rank === 2
                        ? "border-gray-400"
                        : rank === 3
                        ? "border-orange-600"
                        : "border-transparent"
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
                </div>

                <div className="grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-bold text-base truncate ${
                        isMe ? "text-orange-400" : "text-white"
                      }`}
                    >
                      {player.name}
                    </h3>
                    {isMe && (
                      <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 rounded">
                        YOU
                      </span>
                    )}
                  </div>
                  {player.streak?.current > 0 && (
                    <div className="flex items-center text-[10px] text-gray-400 mt-0.5">
                      <Flame
                        size={10}
                        className="mr-1 text-orange-500 fill-orange-500"
                      />
                      {player.streak.current} Day Streak
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`font-black text-lg ${
                      rank === 1
                        ? "text-yellow-400"
                        : rank === 2
                        ? "text-gray-300"
                        : rank === 3
                        ? "text-orange-400"
                        : "text-white"
                    }`}
                  >
                    {player.points.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-wider">
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
