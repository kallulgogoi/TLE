import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Plus, Check, Search } from "lucide-react";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const navigate = useNavigate();
  const { user, checkUser } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: allSubjects } = await api.get("/subjects");
      setSubjects(allSubjects);

      if (user && user.subjects) {
        setEnrolledIds(user.subjects.map((s) => s.subjectId));
      } else {
        const { data: userData } = await api.get("/auth/me");
        setEnrolledIds(userData.subjects.map((s) => s.subjectId._id));
      }
    } catch (error) {
      console.error("Error loading subjects", error);
    }
  };

  const handleStartSubject = async (subjectId) => {
    try {
      await api.post("/users/subjects", { subjectId, skillLevel: 1 });
      await api.post(`/subjects/${subjectId}/generate-lessons`, {
        skillLevel: 1,
      });
      await checkUser();
      navigate(`/subject/${subjectId}/dashboard`);
    } catch (error) {
      alert("Error starting course. You might already be enrolled.");
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-800 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Mission Catalog
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Select a specialization to begin your training.
          </p>
        </div>

        {/* Search Placeholder (Visual only for now) */}
        <div className="mt-6 md:mt-0 relative w-full md:w-auto">
          <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search protocols..."
            className="w-full md:w-80 bg-gray-900 border border-gray-800 text-gray-300 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => {
          const isEnrolled = enrolledIds.includes(subject._id);

          return (
            <div
              key={subject._id}
              className="group bg-gray-900 rounded-3xl border border-gray-800 p-8 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="bg-gray-800 p-4 rounded-2xl group-hover:bg-orange-600 transition-colors duration-300">
                  <img
                    src={subject.icon}
                    alt=""
                    className="w-12 h-12 object-contain filter invert brightness-0 group-hover:invert-0 group-hover:brightness-200 transition-all"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                {isEnrolled && (
                  <span className="bg-green-900/30 text-green-400 border border-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Enrolled
                  </span>
                )}
              </div>

              <div className="mb-8 flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {subject.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">
                    {subject.totalLevels} Levels
                  </span>
                  <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">
                    Adaptive AI
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                {isEnrolled ? (
                  <button
                    onClick={() =>
                      navigate(`/subject/${subject._id}/dashboard`)
                    }
                    className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <Check size={18} className="text-green-500" /> Resume
                    Operation
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartSubject(subject._id)}
                    className="w-full bg-orange-600 text-black py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-500 shadow-lg shadow-orange-900/20 transition-all transform group-hover:-translate-y-1"
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
