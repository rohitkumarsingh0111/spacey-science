import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Star,
  Target,
  Award,
  Rocket,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/badge";
import { Progress } from "@/components/progress";

import { getUserProgress, getProgressStats } from "@/lib/api";
import { Progress as ProgressItem, ProgressStats, User } from "@/types/types";

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [progressRes, statsRes] = await Promise.all([
        getUserProgress(user._id),
        getProgressStats(user._id),
      ]);

      if (progressRes.data.success) {
        setProgress(progressRes.data.data.progress);
      }

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Rank Logic
  const xp = stats?.totalScore || 0;
  const level = Math.floor(xp / 500) + 1;
  const currentXP = xp % 500;
  const xpPercentage = (currentXP / 500) * 100;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-bounce text-5xl">🚀</div>
      </div>
    );
  }

  return (
    
  <div className="space-bg min-h-screen text-white relative overflow-hidden">


    {/* HEADER */}
    <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        <Button
          variant="ghost"
          onClick={() => navigate("/topics")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-xl font-semibold tracking-tight">
          Mission Control
        </h1>

        <Button
          variant="outline"
          onClick={onLogout}
          className="border-white/10 bg-white/5"
        >
          Logout
        </Button>
      </div>
    </header>

    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl font-semibold tracking-tight">
          Welcome back, {user.name}
        </h2>
        <p className="text-gray-400 mt-2">
          Here’s your learning progress overview.
        </p>
      </motion.div>

      {/* LEVEL CARD */}
      <Card className="bg-white/5 border border-white/10 mb-12">
        <CardContent className="p-8">

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-400">Current Level</p>
              <h3 className="text-2xl font-semibold text-blue-400">
                Level {level}
              </h3>
            </div>

            <Rocket className="w-8 h-8 text-red-400" />
          </div>

          <Progress
  value={xpPercentage}
  className="h-2 bg-white/25 [&>div]:bg-blue-100"
/>


          <p className="text-xs text-gray-400 mt-3">
            {500 - currentXP} XP until next level
          </p>

        </CardContent>
      </Card>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">

        {[
          {
            icon: <Trophy className="text-blue-400 w-6 h-6" />,
            label: "Total Points",
            value: xp,
          },
          {
            icon: <Target className="text-blue-400 w-6 h-6" />,
            label: "Quizzes Completed",
            value: stats?.totalQuizzes || 0,
          },
          {
            icon: <Award className="text-blue-400 w-6 h-6" />,
            label: "Badges Earned",
            value: stats?.badges?.length || 0,
          },
          {
            icon: <Star className="text-blue-400 w-6 h-6" />,
            label: "Lessons Completed",
            value: stats?.completedLessons?.length || 0,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-white/5 border border-white/10">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">{card.label}</p>
                  <h3 className="text-2xl font-semibold">
                    {card.value}
                  </h3>
                </div>
                {card.icon}
              </CardContent>
            </Card>
          </motion.div>
        ))}

      </div>

      {/* TWO COLUMN SECTION */}
      <div className="grid lg:grid-cols-2 gap-12">

        {/* BADGES */}
        <Card className="bg-white/5 border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Achievements
            </CardTitle>
          </CardHeader>

          <CardContent>
            {stats && stats.allBadges.length ? (
              <div className="grid grid-cols-2 gap-4">
                {stats.allBadges.map((badge) => {
                  const earned = stats.badges.includes(badge.name);

                  return (
                    <div
                      key={badge.name}
                      className={`p-4 rounded-xl border text-center ${
                        earned
                          ? "border-blue-400 bg-blue-500/10"
                          : "border-white/10 bg-white/5 opacity-50"
                      }`}
                    >
                      <div className="text-3xl mb-2">
                        {badge.icon}
                      </div>
                      <p className="text-sm font-medium">
                        {badge.name}
                      </p>
                      {earned && (
                        <Badge className="mt-2 bg-blue-500">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400">
                Complete quizzes to unlock achievements.
              </p>
            )}
          </CardContent>
        </Card>

        {/* MISSION LOG */}
        <Card className="bg-white/5 border border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Learning Activity
            </CardTitle>
          </CardHeader>

          <CardContent>
            {progress.length ? (
              <div className="space-y-4">
                {progress.slice(0, 6).map((item) => (
                  <div
                    key={item._id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <h4 className="capitalize font-medium">
                      {item.topic}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Score: {item.score}/{item.totalQuestions}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                No learning activity yet.
              </p>
            )}
          </CardContent>
        </Card>

      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <Button
          size="lg"
          onClick={() => navigate("/topics")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl"
        >
          Continue Learning
        </Button>
      </div>

    </div>
  </div>
);

}
