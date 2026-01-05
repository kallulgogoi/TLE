import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  ArrowRight,
  BookOpen,
  Plus,
  Mic,
  Zap,
  CheckCircle,
  Clock,
} from "lucide-react";
import { SkeletonCard } from "../../components/UI/Skeleton";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [pendingInterviews, setPendingInterviews] = useState([]);
  const [pastInterviews, setPastInterviews] = useState([]);
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
      setPastInterviews(data.completedInterviews || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to sync mission data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="w-full px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-gray-800 pb-6 gap-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 md:h-10 md:w-64 bg-gray-900 rounded mb-2"></div>
            <div className="h-4 w-32 md:h-5 md:w-40 bg-gray-900 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 md:space-y-12 px-4 md:px-6 lg:px-8 py-6">
      {/* PENDING INTERVIEW BANNER */}
      {pendingInterviews.length > 0 && (
        <div className="relative group">
          <div className="absolute inset-0 bg-orange-600 blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative bg-gray-900 border-2 border-orange-500 p-5 md:p-8 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6">
              <div className="p-4 bg-orange-600 text-black rounded-2xl rotate-2">
                <Mic size={24} className="md:w-8 md:h-8" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Zap size={12} className="text-orange-500 fill-orange-500" />
                  <span className="text-orange-500 font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                    Evaluation Protocol Active
                  </span>
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  Final Interview: {pendingInterviews[0].subject?.name}
                </h2>
                <p className="text-gray-400 text-xs md:text-sm font-medium mt-1">
                  AI-generated custom MCQ evaluation based on your skill level.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/interview/${pendingInterviews[0]._id}`)}
              className="w-full lg:w-auto px-8 py-3.5 md:py-4 bg-orange-600 text-black font-black uppercase text-xs md:text-sm tracking-widest hover:bg-white transition-all active:scale-95 shadow-xl"
            >
              Start Interview
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE MISSIONS SECTION */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 border-b border-gray-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic">
              Active Missions
            </h1>
            <p className="text-gray-500 mt-1 font-medium font-mono text-xs md:text-sm tracking-widest">
              DECRYPTING LEARNING PATHS...
            </p>
          </div>
          <button
            onClick={() => navigate("/subjects")}
            className="w-full md:w-auto group bg-gray-800 text-white px-5 py-3 rounded-xl hover:bg-orange-600 hover:text-black transition-all font-bold flex items-center justify-center gap-2 border border-gray-700 hover:border-orange-500 text-sm"
          >
            <Plus size={18} /> Add Subjects
          </button>
        </div>

        {enrolledSubjects.length === 0 ? (
          <div className="bg-gray-900/50 rounded-3xl p-10 md:p-16 text-center border border-dashed border-gray-800">
            <BookOpen className="text-orange-500 mx-auto mb-4" size={40} />
            <h3 className="text-lg md:text-xl font-bold text-white uppercase">
              No Active Simulations
            </h3>
            <button
              onClick={() => navigate("/subjects")}
              className="mt-4 text-orange-500 font-bold uppercase text-[10px] md:text-xs flex items-center justify-center gap-2 mx-auto"
            >
              Explore Catalog <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {enrolledSubjects.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/subject/${item.subjectId?._id}/dashboard`)
                }
                className="group bg-gray-900 rounded-2xl md:rounded-3xl border border-gray-800 p-5 md:p-8 cursor-pointer hover:border-orange-500 transition-all relative overflow-hidden active:scale-[0.98] md:active:scale-100"
              >
                <div className="flex items-start justify-between mb-6 md:mb-8 relative z-10">
                  <div className="bg-gray-800 p-3 md:p-4 rounded-xl md:rounded-2xl group-hover:bg-orange-600 transition-colors">
                    <img
                      src={
                        item.subjectId?.icon ||
                        "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                      }
                      alt="icon"
                      className="w-8 h-8 md:w-10 md:h-10 object-contain filter invert brightness-0 group-hover:brightness-200 group-hover:invert-0"
                    />
                  </div>
                  <span
                    className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest ${
                      item.isCompleted
                        ? "bg-green-900/30 text-green-400"
                        : "bg-orange-900/30 text-orange-400"
                    }`}
                  >
                    {item.isCompleted ? "Completed" : "Active"}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg md:text-2xl font-black text-white mb-1 md:mb-2 group-hover:text-orange-500 uppercase tracking-tight truncate">
                    {item.subjectId?.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mb-6 md:mb-8 font-medium">
                    {item.subjectId?.description}
                  </p>

                  <div className="mb-4 md:mb-6">
                    <div className="flex justify-between text-[9px] md:text-[10px] font-black text-gray-600 mb-2 uppercase">
                      <span>Sync Progress</span>
                      <span className="text-orange-500">
                        {Math.round((item.completedLessons?.length / 10) * 100)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 md:h-2 overflow-hidden">
                      <div
                        className="bg-orange-600 h-full transition-all duration-1000"
                        style={{
                          width: `${
                            (item.completedLessons?.length / 10) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center text-[10px] md:text-xs font-black text-gray-400 group-hover:text-white uppercase tracking-widest">
                    Resume{" "}
                    <ArrowRight size={12} className="ml-2 text-orange-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ARCHIVE SECTION */}
      {pastInterviews.length > 0 && (
        <div className="pt-6 md:pt-10">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <CheckCircle
              className="text-green-500 md:w-6 md:h-6"
              size={20}
            />
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic">
              Archive: History
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {pastInterviews.map((int) => (
              <div
                key={int._id}
                onClick={() => navigate(`/interview/review/${int._id}`)}
                className="group bg-gray-900/40 border border-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl flex justify-between items-center hover:border-green-500/50 cursor-pointer transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <div className="p-2 md:p-3 bg-gray-800 rounded-lg md:rounded-xl group-hover:bg-green-600 transition-colors shrink-0">
                    <Clock
                      size={18}
                      className="text-gray-400 group-hover:text-black"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white text-sm md:text-base font-bold group-hover:text-green-500 transition-colors uppercase tracking-tight truncate">
                      {int.subject?.name}
                    </h4>
                    <p className="text-[9px] md:text-[10px] text-gray-600 font-mono uppercase">
                      {new Date(int.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="shrink-0 bg-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest group-hover:bg-green-600 group-hover:text-black transition-all">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
