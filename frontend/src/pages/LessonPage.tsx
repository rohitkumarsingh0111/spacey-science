import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API_URL =
  import.meta.env.MODE === "production"
    ? "https://spacey-science.onrender.com"
    : "http://localhost:3000";

export default function LessonPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) return;
    fetchLesson();
  }, [topicId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/api/lesson/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicId }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate lesson");
      }

      setLesson(data.data);
      setCurrentSection(0);
      setExpandedContent(null);
    } catch (err: any) {
      console.error("Lesson Fetch Error:", err);
      setError(err.message || "Failed to fetch lesson");
    } finally {
      setLoading(false);
    }
  };

  const handleLearnMore = async () => {
    if (!lesson?.sections?.[currentSection]) return;

    try {
      const section = lesson.sections[currentSection];

      const res = await fetch(`${API_URL}/api/lesson/expand`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section }),
      });

      const data = await res.json();

      if (data.success) {
        setExpandedContent(data.data);
      }
    } catch (err) {
      console.error("Expand Error:", err);
    }
  };

  const handleQuiz = () => {
    if (!lesson) return;

    navigate(`/quiz/${topicId}`, {
      state: {
        lessonText: lesson.sections
          ?.map((s: any) => s.content)
          .join(" "),
      },
    });
  };

  /* ========================
     UI STATES
  ======================== */

  if (loading) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">AI is preparing your lesson...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  if (!lesson || !lesson.sections?.length) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-xl">Lesson not available.</p>
      </div>
    );
  }

  const section = lesson.sections[currentSection];

  /* ========================
     MAIN UI
  ======================== */

  return (
    <div className="space-bg min-h-screen relative">
      <div className="content-wrapper container mx-auto px-4 py-12">
        <h1 className="text-4xl text-white mb-6 text-center">
          {lesson.title}
        </h1>

        <Card className="glass-strong p-10 mb-8">
          <div className="text-6xl mb-4">{section.emoji}</div>

          <h2 className="text-2xl font-bold text-white mb-4">
            {section.heading}
          </h2>

          <p className="text-gray-200">{section.content}</p>

          {expandedContent && (
            <div className="mt-6 text-blue-300">
              {expandedContent}
            </div>
          )}

          <Button
            variant="outline"
            className="mt-6"
            onClick={handleLearnMore}
          >
            Learn More 🚀
          </Button>
        </Card>

        {/* Persistent Quiz Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            variant="space"
            size="lg"
            onClick={handleQuiz}
            className="pulse-glow shadow-2xl"
          >
            Take Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
