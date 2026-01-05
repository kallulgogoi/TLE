import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Terminal,
  Cpu,
  Trophy,
  Target,
  ArrowRight,
  Shield,
  Zap,
  Code,
  Activity,
  Hash,
} from "lucide-react";

const LandingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="animate-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800 text-sm text-gray-400 mb-8 hover:border-orange-500/50 transition-colors cursor-default backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
              <span className="tracking-widest font-mono text-xs">
                PADHO.AI v1.0 ONLINE
              </span>
            </div>
          </div>

          <h1 className="animate-up delay-100 text-5xl md:text-8xl font-black italic tracking-tighter mb-6 leading-[0.9] relative">
            <span className="block text-white">MASTER THE</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-red-600">
              ALGORITHM
            </span>
          </h1>

          <p className="animate-up delay-200 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            <span className="text-white font-bold">Padho.AI</span>: The advanced
            training ground for elite developers.
            <span className="text-white font-medium"> Adaptive AI</span>,
            <span className="text-white font-medium"> PvP Battles</span>, and
            <span className="text-white font-medium"> Global Ranks</span>.
          </p>

          <div className="animate-up delay-300 flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
            <Link
              to="/login"
              className="w-full md:w-auto group relative px-8 py-4 bg-orange-600 hover:bg-orange-500 text-black font-bold text-lg rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(234,88,12,0.4)]"
            >
              Initialize Training{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="#features"
              className="w-full md:w-auto px-8 py-4 bg-gray-900/50 hover:bg-gray-900 text-white font-bold text-lg rounded-xl border border-gray-800 hover:border-gray-600 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Code size={20} className="text-gray-500" /> View Protocol
            </a>
          </div>

          <div className="animate-up delay-400 mx-auto max-w-4xl rounded-xl bg-black/80 border border-gray-800 shadow-2xl overflow-hidden text-left backdrop-blur-sm relative group hover:border-gray-700 transition-colors">
            <div className="flex gap-2 p-3 border-b border-gray-800 bg-gray-900/50">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <div className="p-6 font-mono text-sm md:text-base text-gray-300 min-h-[200px]">
              <p className="mb-2">
                <span className="text-green-500">➜</span>{" "}
                <span className="text-blue-400">~</span> padho init
                --target=user
              </p>
              <p className="mb-2 text-gray-500">
                [INFO] Loading core modules... Done
              </p>
              <p className="mb-2 text-gray-500">
                [INFO] Connecting to neural network... Done
              </p>
              <p className="mb-2">
                <span className="text-green-500">✔</span> Skill Assessment:{" "}
                <span className="text-orange-500 font-bold">
                  Beginner → Master Path Found
                </span>
              </p>
              <br />
              <p className="animate-pulse">
                <span className="text-orange-500">root@padho.ai:~$</span> _
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-900 bg-black/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          <StatItem
            number="Adaptive"
            label="Difficulty"
            icon={<Cpu size={20} className="text-blue-500" />}
          />
          <StatItem
            number="10+"
            label="Skill Tracks"
            icon={<Target size={20} className="text-red-500" />}
          />
          <StatItem
            number="Global"
            label="Leaderboards"
            icon={<Trophy size={20} className="text-yellow-500" />}
          />
          <StatItem
            number="Real-time"
            label="Feedback"
            icon={<Activity size={20} className="text-green-500" />}
          />
        </div>
      </section>

      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-20 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tactical Advantages
            </h2>
            <p className="text-gray-400 text-xl">
              Why elite developers choose Padho.AI to sharpen their skills and
              dominate technical interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu size={32} className="text-orange-500" />}
              title="Adaptive AI Core"
              desc="Stop wasting time on easy problems. Our engine analyzes your performance in real-time, serving content that pushes your limits exactly when you're ready."
            />
            <FeatureCard
              icon={<Trophy size={32} className="text-yellow-500" />}
              title="Competitive Ladder"
              desc="Earn XP, unlock badges, and climb the global leaderboard. Compete against operatives worldwide to prove your dominance in the field."
            />
            <FeatureCard
              icon={<Terminal size={32} className="text-green-500" />}
              title="System Mastery"
              desc="From Data Structures (DSA) to Operating Systems (OS) and Networks (CN). Master the core pillars of computer science in one unified interface."
            />
            <FeatureCard
              icon={<Shield size={32} className="text-blue-500" />}
              title="Battle Hardened"
              desc="Prepare for the toughest technical interviews with curated paths designed by industry veterans from top tech giants."
            />
            <FeatureCard
              icon={<Zap size={32} className="text-purple-500" />}
              title="Instant Feedback"
              desc="No more waiting. Get immediate analysis on your answers, detailed explanations, and resource recommendations to plug your knowledge gaps."
            />
            <FeatureCard
              icon={<Target size={32} className="text-red-500" />}
              title="Focused Streaks"
              desc="Build discipline with daily mission streaks. Our gamified system ensures you stay consistent, turning learning into a daily habit."
            />
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gray-900 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 text-white">
            READY TO <span className="text-orange-600">DEPLOY?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
            Join thousands of other developers mastering the craft. Your first
            mission awaits.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 px-12 py-6 bg-white hover:bg-gray-200 text-black font-bold text-xl rounded-2xl transition-all transform hover:-translate-y-1 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <Zap className="fill-black" /> START MISSION
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-900 py-12 bg-black text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black italic tracking-tighter text-white">
            Padho<span className="text-orange-500">.AI</span>
          </div>
          <p className="text-gray-600">© 2026 Padho.AI. All systems nominal.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatItem = ({ number, label, icon }) => (
  <div className="flex flex-col items-center justify-center p-4 group">
    <div className="mb-3 p-3 bg-gray-800/50 rounded-full border border-gray-700 group-hover:border-gray-500 transition-colors">
      {icon}
    </div>
    <div className="text-3xl md:text-4xl font-black text-white mb-1">
      {number}
    </div>
    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest group-hover:text-orange-500 transition-colors">
      {label}
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl bg-gray-900/30 border border-gray-800 hover:border-orange-500/30 hover:bg-gray-900 transition-all group backdrop-blur-sm">
    <div className="mb-6 p-4 rounded-2xl bg-black border border-gray-800 w-fit group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-orange-900/20">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed text-sm md:text-base">{desc}</p>
  </div>
);

export default LandingPage;
