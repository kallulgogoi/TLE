import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { ArrowRight, BookOpen, Plus, Mic, Zap, Target } from "lucide-react";
import { SkeletonCard } from "../../components/UI/Skeleton";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [pendingInterviews, setPendingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/users/dashboard");
      const validSubjects = (data.user.subjects || []).filter(
        (item) => item.subjectId !== null
      );
      setEnrolledSubjects(validSubjects);
      setPendingInterviews(data.pendingInterviews || []);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      toast.error("Failed to sync mission data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="w-full">
        <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-6">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-gray-900 rounded mb-2"></div>
            <div className="h-5 w-40 bg-gray-900 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto">
      {pendingInterviews.length > 0 && (
        <div className="mb-12 relative group">
          <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-red-600 -skew-x-2 transform -translate-y-1 opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-gray-900 border-2 border-orange-500 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(234,88,12,0.15)]">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="p-5 bg-orange-600 text-black rounded-2xl rotate-3 group-hover:rotate-0 transition-transform">
                  <Mic size={32} />
                </div>
                <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded animate-bounce">
                  NEW
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={14} className="text-orange-500 fill-orange-500" />
                  <span className="text-orange-500 font-mono text-xs font-bold uppercase tracking-tighter">
                    Skill Calibration Complete
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                  Final Evaluation: {pendingInterviews[0].subject?.name}
                </h2>
                <p className="text-gray-400 font-medium text-sm">
                  The ML Predictor has analyzed your performance. Initiate the
                  AI Interview to finalize your grade.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/interview/${pendingInterviews[0]._id}`)}
              className="w-full md:w-auto px-12 py-5 bg-orange-600 text-black font-black uppercase text-sm tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/40"
            >
              Start Interview
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mb-10 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">
            Active Missions
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Your synchronized learning paths
          </p>
        </div>
        <button
          onClick={() => navigate("/subjects")}
          className="group relative overflow-hidden bg-gray-800 text-white px-7 py-4 rounded-2xl hover:bg-orange-600 hover:text-black transition-all duration-300 font-bold text-lg flex items-center gap-3 w-fit md:justify-self-end border border-gray-700 hover:border-orange-500 shadow-lg"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          Enroll in Subjects
        </button>
      </div>

      {/* Subject Grid */}
      {enrolledSubjects.length === 0 ? (
        <div className="bg-gray-900/50 rounded-3xl p-16 text-center border border-dashed border-gray-800">
          <div className="bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
            <BookOpen className="text-orange-500" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white uppercase tracking-tighter">
            No Active Simulations
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            You haven't initialized any learning modules yet. Access the catalog
            to begin your training.
          </p>
          <button
            onClick={() => navigate("/subjects")}
            className="text-orange-500 font-bold hover:text-white transition-colors text-lg flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            Open Catalog <ArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledSubjects.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/subject/${item.subjectId._id}/dashboard`)
              }
              className="group bg-gray-900 rounded-3xl border border-gray-800 p-8 cursor-pointer hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="bg-gray-800 p-4 rounded-2xl group-hover:bg-orange-600 transition-colors duration-300 border border-gray-700 group-hover:border-orange-500">
                  <img
                    src={
                      item.subjectId?.icon ||
                      "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    }
                    alt="icon"
                    className="w-10 h-10 object-contain filter invert brightness-0 group-hover:brightness-200 group-hover:invert-0 transition-all"
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.isCompleted
                        ? "bg-green-900/30 text-green-400 border border-green-800"
                        : "bg-orange-900/30 text-orange-400 border border-orange-800"
                    }`}
                  >
                    {item.isCompleted ? "Completed" : "Active"}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                    <Target size={10} /> LVL {item.currentLevel || 1}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-orange-500 transition-colors uppercase tracking-tight">
                  {item.subjectId?.name || "Unknown"}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-8 h-10 leading-relaxed font-medium">
                  {item.subjectId?.description || "No description available"}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-[10px] font-black text-gray-600 mb-2 uppercase tracking-tighter">
                    <span>Synchronization</span>
                    <span className="text-orange-500">
                      {Math.round((item.completedLessons?.length / 10) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-800">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-orange-400 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${(item.completedLessons?.length / 10) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center text-xs font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">
                  Resume Mission
                  <ArrowRight
                    size={14}
                    className="ml-2 group-hover:translate-x-1 transition-transform text-orange-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
