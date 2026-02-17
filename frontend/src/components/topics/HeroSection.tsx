import { motion } from "framer-motion";
import { User } from "@/types/types";

interface HeroSectionProps {
  user: User;
}

export default function HeroSection({ user }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mb-28"
    >
      {/* Subtle Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center px-6">

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          Mission Overview
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
  Welcome back,
  <span className="text-white font-semibold tracking-tight"> {user.name}</span>.
  <br className="hidden md:block" />
  Continue your structured journey through
  <span className="text-blue-400 font-medium"> space science</span>.
</p>


        {/* Stats Panel */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="text-3xl font-semibold text-blue-400">
              {user.totalScore}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Total Experience Points
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="text-3xl font-semibold text-blue-400">
              {user.completedLessons.length}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Lessons Completed
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="text-3xl font-semibold text-blue-400">
              {user.badges.length}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Achievements Earned
            </div>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
}
