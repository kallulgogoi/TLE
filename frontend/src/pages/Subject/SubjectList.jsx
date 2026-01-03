import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Plus, Check, Loader2, PlayCircle, Award } from "lucide-react";
import toast from "react-hot-toast";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get("/subjects");
      setSubjects(data);
    } catch (error) {
      console.error("Error loading subjects", error);
      toast.error("Failed to load operations.");
    } finally {
      setLoading(false);
    }
  };

  const getEnrollmentStatus = (subjectId) => {
    if (!user || !user.subjects) return null;

    const enrollment = user.subjects.find(
      (s) => s.subjectId._id === subjectId || s.subjectId === subjectId
    );

    if (!enrollment) return null; // Not enrolled

    if (enrollment.isCompleted) return "COMPLETED";
    return "IN_PROGRESS";
  };

  const handleStartSubject = async (subjectId) => {
    try {
      await api.post("/users/subjects", { subjectId, skillLevel: 1 });
      toast.success("Mission Initialized");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error starting mission");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-10 pb-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 italic tracking-tighter">
          ACTIVE <span className="text-orange-500">DOMAINS</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Select a specialized training track. Complete missions to earn XP and
          unlock advanced protocols.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => {
          const status = getEnrollmentStatus(subject._id);
          const isEnrolled = !!status;

          return (
            <div
              key={subject._id}
              className="group relative bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/5 rounded-full blur-[60px] group-hover:bg-orange-600/10 transition-colors pointer-events-none"></div>

              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-6">
                  {/* Icon Box */}
                  <div className="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center p-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={
                        subject.icon ||
                        "https://cdn-icons-png.flaticon.com/512/10061/10061738.png"
                      }
                      alt={subject.name}
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100"
                    />
                  </div>

                  {/* STATUS BADGES*/}
                  {status === "COMPLETED" && (
                    <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold flex items-center gap-1.5 tracking-wide">
                      <Award size={14} /> COMPLETE
                    </span>
                  )}
                  {status === "IN_PROGRESS" && (
                    <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-1.5 tracking-wide">
                      <PlayCircle size={14} /> IN PROGRESS
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {subject.description}
                </p>

                {/* Tech Specs */}
                <div className="flex items-center gap-3 text-xs font-mono text-gray-500 mb-8">
                  <span className="bg-gray-800/50 border border-gray-700/50 px-2 py-1 rounded">
                    {subject.totalLevels || 15} LEVELS
                  </span>
                  <span className="bg-gray-800/50 border border-gray-700/50 px-2 py-1 rounded text-orange-500/80">
                    ADAPTIVE AI
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto relative z-10">
                {isEnrolled ? (
                  <button
                    onClick={() =>
                      navigate(`/subject/${subject._id}/dashboard`)
                    }
                    className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600 group-hover:shadow-lg"
                  >
                    <Check size={18} className="text-green-500" /> Resume
                    Operation
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartSubject(subject._id)}
                    className="w-full bg-orange-600 text-black py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-500 shadow-lg shadow-orange-900/20 transition-all transform active:scale-95"
                  >
                    <Plus size={18} /> Initialize Mission
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectList;
