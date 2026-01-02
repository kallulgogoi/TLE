import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { ArrowRight, BookOpen, Plus } from "lucide-react";
import { SkeletonCard } from "../../components/UI/Skeleton";

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/users/dashboard");
        const validSubjects = (data.user.subjects || []).filter(
          (item) => item.subjectId !== null
        );
        setEnrolledSubjects(validSubjects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

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
    <div className="w-full">
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mb-10 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            My Learning Paths
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Continue your mission</p>
        </div>
        <button
          onClick={() => navigate("/subjects")}
          className="group relative overflow-hidden bg-orange-600 text-black px-7 py-4 rounded-2xl hover:bg-orange-500 transition-all duration-300 font-bold text-lg flex items-center gap-3 w-fit md:justify-self-end shadow-lg hover:shadow-xl hover:shadow-orange-900/30 transform hover:-translate-y-1"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
            Add Subjects
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
        </button>
      </div>

      {enrolledSubjects.length === 0 ? (
        <div className="bg-gray-900 rounded-3xl p-16 text-center border border-dashed border-gray-700">
          <div className="bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="text-orange-500" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">
            No Active Operations
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            You haven't enrolled in any subjects yet. Start a new mission to
            earn XP.
          </p>
          <button
            onClick={() => navigate("/subjects")}
            className="text-orange-500 font-bold hover:text-orange-400 text-lg flex items-center justify-center gap-2"
          >
            Explore Catalog <ArrowRight size={20} />
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
              className="group bg-gray-900 rounded-3xl border border-gray-800 p-8 cursor-pointer hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden hover:shadow-2xl hover:shadow-black"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen size={100} className="text-white" />
              </div>

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="bg-gray-800 p-4 rounded-2xl group-hover:bg-orange-600 transition-colors duration-300 border border-gray-700 group-hover:border-orange-500">
                  <img
                    src={
                      item.subjectId?.icon ||
                      "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    }
                    alt="icon"
                    className="w-10 h-10 object-contain filter invert brightness-0 group-hover:brightness-200 group-hover:invert-0 transition-all"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.isCompleted
                      ? "bg-green-900/30 text-green-400 border border-green-800"
                      : "bg-blue-900/30 text-blue-400 border border-blue-800"
                  }`}
                >
                  {item.isCompleted ? "Completed" : "Active"}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {item.subjectId?.name || "Unknown"}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-8 h-10 leading-relaxed">
                  {item.subjectId?.description || "No description available"}
                </p>

                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                    <span>Progress</span>
                    <span className="text-orange-500">
                      {Math.round((item.completedLessons.length / 15) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-700 to-orange-500 h-3 rounded-full transition-all duration-700"
                      style={{
                        width: `${(item.completedLessons.length / 15) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  Resume Mission
                  <ArrowRight
                    size={16}
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
