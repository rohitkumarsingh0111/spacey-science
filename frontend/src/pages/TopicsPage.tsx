import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SpaceScene from "@/components/background/SpaceScene";
import HeroSection from "@/components/topics/HeroSection";
import TopicCard3D from "@/components/topics/TopicCard3D";
import StatsPanel from "@/components/topics/StatsPanel";
import { TOPICS } from "@/lib/topics";

export default function TopicsPage({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <SpaceScene />

      <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-6 py-5 flex justify-between">
          <h1 className="text-2xl font-bold text-indigo-400">
            Spacey Science 🚀
          </h1>

          <div className="flex gap-4">
            <Button onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <HeroSection user={user} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
  );
}
