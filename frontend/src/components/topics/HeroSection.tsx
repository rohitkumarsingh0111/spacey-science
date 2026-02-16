import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "@/types/types";

interface HeroSectionProps {
  user: User;
}

export default function HeroSection({ user }: HeroSectionProps) {
  const [typedText, setTypedText] = useState("");
  const fullText = "Preparing next cosmic mission...";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative text-center mb-24"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Floating UI Card */}
      <motion.div
        whileHover={{ rotateX: 4, rotateY: -4 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative z-10 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl px-12 py-14 shadow-2xl"
      >
        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight 
          bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
          bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]">
          Mission Control
        </h1>

        {/* Astronaut Greeting */}
        <p className="mt-6 text-xl text-gray-300">
          Welcome back, <span className="text-indigo-400 font-semibold">{user.name}</span> 
        </p>

        {/* Typewriter subtitle */}
        <p className="mt-4 text-sm tracking-widest uppercase text-purple-300 font-mono">
          {typedText}
          <span className="animate-pulse">|</span>
        </p>

        {/* XP Display */}
        <div className="mt-8 flex justify-center gap-10 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-400">
              {user.totalScore}
            </div>
            <div className="text-gray-400 text-sm">Total XP</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-pink-400">
              {user.completedLessons.length}
            </div>
            <div className="text-gray-400 text-sm">Missions Completed</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-yellow-400">
              {user.badges.length}
            </div>
            <div className="text-gray-400 text-sm">Achievements</div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
