import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Star,
  TrendingUp,
  Target,
  Award,
  Rocket,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/badge";
import { Progress } from "@/components/progress";

import { getUserProgress, getProgressStats } from "@/lib/api";
import SpaceBackground from "@/components/background/SpaceBackground";

export default function DashboardPage({ user, onLogout }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);
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
    <div className="relative min-h-screen text-white overflow-hidden">
      <SpaceBackground />

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/topics")}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Mission Control
          </h1>

          <Button
            variant="outline"
            onClick={onLogout}
            className="border-white/20 bg-white/5"
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back, {user.name} 👨‍🚀
          </h2>
          <p className="text-gray-400 mt-3">
            Your galactic progress awaits.
          </p>
        </motion.div>

        {/* XP + Rank */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-400">Current Rank</p>
                  <h3 className="text-2xl font-bold text-indigo-400">
                    🚀 Level {level} Explorer
                  </h3>
                </div>
                <Rocket className="w-10 h-10 text-indigo-400 animate-pulse" />
              </div>

              <Progress value={xpPercentage} className="h-3 rounded-full" />
              <p className="text-xs text-gray-400 mt-2">
                {500 - currentXP} XP to next level
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Trophy className="text-yellow-400 w-8 h-8" />,
              label: "Total Points",
              value: xp,
            },
            {
              icon: <Target className="text-blue-400 w-8 h-8" />,
              label: "Quizzes",
              value: stats?.totalQuizzes || 0,
            },
            {
              icon: <Award className="text-purple-400 w-8 h-8" />,
              label: "Badges",
              value: stats?.badges?.length || 0,
            },
            {
              icon: <Star className="text-pink-400 w-8 h-8" />,
              label: "Topics",
              value: stats?.completedLessons?.length || 0,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm">{card.label}</p>
                    <h3 className="text-3xl font-bold">
                      {card.value}
                    </h3>
                  </div>
                  {card.icon}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Trophy className="text-yellow-400" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.allBadges?.length ? (
                <div className="grid grid-cols-2 gap-4">
                  {stats.allBadges.map((badge, index) => {
                    const earned = stats.badges.includes(badge.name);
                    return (
                      <motion.div
                        key={badge.name}
                        whileHover={{ scale: 1.08 }}
                        className={`p-4 rounded-xl text-center border ${
                          earned
                            ? "border-yellow-400 bg-yellow-500/10"
                            : "border-white/10 bg-white/5 opacity-50"
                        }`}
                      >
                        <div className="text-4xl mb-2">
                          {badge.icon}
                        </div>
                        <p className="text-sm font-semibold">
                          {badge.name}
                        </p>
                        {earned && (
                          <Badge className="mt-2">
                            Unlocked
                          </Badge>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400">
                  Complete quizzes to earn badges!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Mission Timeline */}
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="text-green-400" />
                Mission Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progress.length ? (
                <div className="border-l border-white/20 pl-6 space-y-6">
                  {progress.slice(0, 8).map((item) => (
                    <div key={item._id} className="relative">
                      <div className="absolute -left-3 w-5 h-5 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/40" />
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="capitalize font-semibold">
                          {item.topic}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Score: {item.score}/{item.totalQuestions}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  No missions completed yet 🚀
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/topics")}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-6 text-lg shadow-lg"
          >
            <Star className="mr-2" />
            Explore New Galaxies
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
