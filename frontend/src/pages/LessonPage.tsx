import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getTopic } from '@/lib/topics';
import { User } from '@/types/types';

interface LessonPageProps {
  user: User;
}

const LESSON_CONTENT: Record<string, { title: string; sections: { heading: string; content: string; emoji: string }[] }> = {
  'solar-system': {
    title: 'Our Amazing Solar System',
    sections: [
      {
        heading: 'What is the Solar System?',
        content: 'The Solar System is our home in space! It includes the Sun and everything that orbits around it - 8 planets, moons, asteroids, and comets. The Sun is a star at the center, and it\'s SO BIG that it makes up 99.8% of all the mass in our Solar System!',
        emoji: '☀️'
      },
      {
        heading: 'The 8 Planets',
        content: 'Starting from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. The first four (Mercury to Mars) are rocky planets. The last four are gas giants - huge planets made mostly of gas!',
        emoji: '🪐'
      },
      {
        heading: 'Fun Fact!',
        content: 'If you could drive a car to the Sun at highway speed, it would take about 177 YEARS to get there! Space is REALLY big!',
        emoji: '🚗'
      }
    ]
  },
  'moon': {
    title: 'Earth\'s Moon',
    sections: [
      {
        heading: 'Our Closest Neighbor',
        content: 'The Moon is Earth\'s only natural satellite. It\'s about 384,400 kilometers (238,855 miles) away from Earth. That might sound far, but it\'s actually our closest neighbor in space!',
        emoji: '🌙'
      },
      {
        heading: 'Phases of the Moon',
        content: 'The Moon doesn\'t make its own light - it reflects sunlight! As the Moon orbits Earth, we see different amounts of its lit side, creating the phases: New Moon, Crescent, Quarter, Gibbous, and Full Moon.',
        emoji: '🌗'
      },
      {
        heading: 'Moon Landing',
        content: 'On July 20, 1969, humans landed on the Moon for the first time! Neil Armstrong was the first person to walk on the Moon. His first words were: "That\'s one small step for man, one giant leap for mankind."',
        emoji: '👨‍🚀'
      }
    ]
  },
  // Add more topics as needed
}

export default function LessonPage({ user }: LessonPageProps) {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  
  const topic = getTopic(topicId || '');
  const lessonContent = LESSON_CONTENT[topicId || ''] || LESSON_CONTENT['solar-system'];
  
  if (!topic) {
    return <div>Topic not found</div>;
  }

  const section = lessonContent.sections[currentSection];
  const isLastSection = currentSection === lessonContent.sections.length - 1;

  const handleNext = () => {
    if (isLastSection) {
      navigate(`/quiz/${topicId}`);
    } else {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    } else {
      navigate('/topics');
    }
  };

  return (
    <div className="space-bg min-h-screen">
      <div className="content-wrapper container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/topics')}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>

          <div className="text-sm text-gray-400">
            Section {currentSection + 1} of {lessonContent.sections.length}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="text-8xl mb-6">{topic.icon}</div>
            <h1 className="text-5xl font-bold gradient-text-space mb-4">
              {lessonContent.title}
            </h1>
            <p className="text-xl text-gray-300 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Let's explore together!
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </p>
          </motion.div>

          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="glass-strong p-10 border-white/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-6xl flex-shrink-0">
                  {section.emoji}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 my-8">
            {lessonContent.sections.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSection
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                    : index < currentSection
                    ? 'w-2 bg-green-500'
                    : 'w-2 bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              className="bg-white/5 border-white/10 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentSection === 0 ? 'Back' : 'Previous'}
            </Button>

            <Button
              variant="space"
              size="lg"
              onClick={handleNext}
              className="pulse-glow"
            >
              {isLastSection ? (
                <>
                  Take the Quiz
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}