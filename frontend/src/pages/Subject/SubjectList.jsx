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
    const enrollment = user.subjects.find((s) => {
      const enrollmentId = s.subjectId?._id || s.subjectId;
      return enrollmentId === subjectId;
    });

    if (!enrollment) return null;

    return enrollment.isCompleted ? "COMPLETED" : "IN_PROGRESS";
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
      <div className="flex justify-center items-center min-h-dvh">
        <Loader2 className="animate-spin text-orange-500 w-10 h-10 md:w-12 md:h-12" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 md:py-10 pb-24">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 italic tracking-tighter uppercase">
          Active <span className="text-orange-500">Domains</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
          Select a specialized training track. Complete missions to earn XP and
          unlock advanced protocols.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {subjects.map((subject) => {
          const status = getEnrollmentStatus(subject._id);
          const isEnrolled = !!status;

          return (
            <div
              key={subject._id}
              className="group relative bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-orange-500/50 transition-all duration-300 md:hover:-translate-y-2 shadow-2xl overflow-hidden flex flex-col active:scale-[0.98] md:active:scale-100"
            >
              <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-orange-600/5 rounded-full blur-[40px] md:blur-[60px] group-hover:bg-orange-600/10 transition-colors pointer-events-none"></div>

              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-5 md:mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={
                        subject.icon ||
                        "https://cdn-icons-png.flaticon.com/512/10061/10061738.png"
                      }
                      alt={subject.name}
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100"
                    />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {status === "COMPLETED" && (
                      <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] md:text-xs font-bold flex items-center gap-1.5 tracking-wide">
                        <Award size={12} className="md:w-[14px]" /> COMPLETE
                      </span>
                    )}
                    {status === "IN_PROGRESS" && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-bold flex items-center gap-1.5 tracking-wide">
                        <PlayCircle size={12} className="md:w-[14px]" /> ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-orange-500 transition-colors uppercase tracking-tight">
                  {subject.name}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-5 md:mb-6 leading-relaxed">
                  {subject.description}
                </p>

                <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono text-gray-500 mb-6 md:mb-8">
                  <span className="bg-gray-800/50 border border-gray-700/50 px-2 py-0.5 md:py-1 rounded whitespace-nowrap">
                    {subject.totalLevels || 15} LEVELS
                  </span>
                  <span className="bg-gray-800/50 border border-gray-700/50 px-2 py-0.5 md:py-1 rounded text-orange-500/80 whitespace-nowrap">
                    ADAPTIVE AI
                  </span>
                </div>
              </div>

              {/* Action Button: Consistent padding for touch targets */}
              <div className="mt-auto relative z-10">
                {isEnrolled ? (
                  <button
                    onClick={() =>
                      navigate(`/subject/${subject._id}/dashboard`)
                    }
                    className="w-full py-3.5 md:py-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 active:scale-95 md:active:scale-100"
                  >
                    <Check size={16} className="text-green-500 md:w-[18px]" />{" "}
                    Resume Operation
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartSubject(subject._id)}
                    className="w-full bg-orange-600 text-black py-3.5 md:py-4 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-orange-500 shadow-lg shadow-orange-900/20 transition-all active:scale-95"
                  >
                    <Plus size={16} className="md:w-[18px]" /> Initialize
                    Mission
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
