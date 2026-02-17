import { Progress } from "@/components/progress";
import { User } from "@/types/types";

interface StatsPanelProps {
  user: User;
}

export default function StatsPanel({ user }: StatsPanelProps) {
  const level = Math.floor(user.totalScore / 500) + 1;
  const xp = user.totalScore % 500;

  return (
    <div className="glass-strong rounded-2xl p-8 mt-20 text-center backdrop-blur-xl bg-white/5 border border-white/10">
      <h2 className="text-2xl font-bold text-indigo-400 mb-4">
        🚀 Level {level} Explorer
      </h2>

     <Progress
  value={(xp / 500) * 100}
  className="h-4 bg-white/25 [&>div]:bg-blue-400"
/>


      <p className="text-gray-400 mt-2">
        {500 - xp} XP to next level
      </p>
    </div>
  );
}
