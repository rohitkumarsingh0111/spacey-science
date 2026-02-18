import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SpaceScene from "@/components/background/SpaceScene";
import HeroSection from "@/components/topics/HeroSection";
import TopicCard3D from "@/components/topics/TopicCard3D";
import StatsPanel from "@/components/topics/StatsPanel";
import { TOPICS } from "@/lib/topics";
import { User } from "@/types/types";

interface TopicsPageProps {
  user: User;
  onLogout: () => void;
}

export default function TopicsPage({ user, onLogout }: TopicsPageProps) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🔥 BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <SpaceScene />
      </div>

      {/* 🔥 CONTENT LAYER */}
      <div className="relative z-10 min-h-screen text-white">

        {/* Header */}
        <header className="border-b border-white/10 bg-[#0F172A]/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

            <h1 className="text-xl font-semibold tracking-tight">
              Spacey Science
            </h1>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="border-white/10 bg-white/5 hover:bg-white/10"
              >
                Dashboard
              </Button>

              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </Button>
            </div>

          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">

          <HeroSection user={user} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 mb-24">
            {TOPICS.map((topic) => (
              <TopicCard3D
                key={topic.id}
                topic={topic}
                completed={user.completedLessons.includes(topic.id)}
                onClick={() => navigate(`/lesson/${topic.id}`)}
              />
            ))}
          </div>

          <StatsPanel user={user} />

        </div>

      </div>

    </div>
  );
}
