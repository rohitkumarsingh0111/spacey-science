import { Topic } from '@/types/types';

export interface EnhancedTopic extends Topic {
  difficultyHint: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  recommendedAge: string;
  funFact: string;
  aiPreviewLine: string;
}

const BASE_TOPICS: EnhancedTopic[] = [
  {
    id: 'solar-system',
    title: 'Solar System',
    description:
      'Travel through our cosmic neighborhood and uncover the secrets of planets, moons, and our blazing Sun.',
    icon: '🪐',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
    difficultyHint: 'easy',
    estimatedTime: '5–7 mins',
    recommendedAge: '6–10 years',
    funFact: 'Jupiter is so large that over 1,300 Earths could fit inside it!',
    aiPreviewLine: 'AI will guide you through planetary adventures and cosmic discoveries.',
  },
  {
    id: 'moon',
    title: 'The Moon',
    description:
      'Explore craters, moon phases, and the story of humanity’s first steps beyond Earth.',
    icon: '🌙',
    color: 'from-gray-400 to-gray-600',
    gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
    difficultyHint: 'easy',
    estimatedTime: '4–6 mins',
    recommendedAge: '6–9 years',
    funFact: 'The Moon is slowly drifting away from Earth every year!',
    aiPreviewLine: 'AI will explain lunar phases and amazing moon missions.',
  },
  {
    id: 'mars',
    title: 'Mars',
    description:
      'Discover the Red Planet’s dusty storms, giant volcanoes, and robotic explorers.',
    icon: '🔴',
    color: 'from-red-600 to-orange-600',
    gradient: 'bg-gradient-to-br from-red-600 to-orange-600',
    difficultyHint: 'medium',
    estimatedTime: '6–8 mins',
    recommendedAge: '8–12 years',
    funFact: 'Mars has the tallest volcano in the solar system — Olympus Mons!',
    aiPreviewLine: 'AI will reveal Mars missions and the search for alien life.',
  },
  {
    id: 'stars',
    title: 'Stars',
    description:
      'Learn how stars are born, shine for billions of years, and sometimes explode spectacularly.',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-600',
    gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    difficultyHint: 'medium',
    estimatedTime: '6–9 mins',
    recommendedAge: '8–12 years',
    funFact: 'Our Sun is just one of billions of stars in the Milky Way!',
    aiPreviewLine: 'AI will take you through the life cycle of powerful stars.',
  },
  {
    id: 'galaxies',
    title: 'Galaxies',
    description:
      'Journey across billions of stars and explore the vast structure of our universe.',
    icon: '🌌',
    color: 'from-purple-600 to-indigo-600',
    gradient: 'bg-gradient-to-br from-purple-600 to-indigo-600',
    difficultyHint: 'hard',
    estimatedTime: '8–10 mins',
    recommendedAge: '10–14 years',
    funFact: 'The Milky Way galaxy is about 100,000 light-years wide!',
    aiPreviewLine: 'AI will help you understand spiral galaxies and cosmic scale.',
  },
  {
    id: 'black-holes',
    title: 'Black Holes',
    description:
      'Dive into mysterious regions of space where gravity bends light and time.',
    icon: '🕳️',
    color: 'from-black to-purple-900',
    gradient: 'bg-gradient-to-br from-black to-purple-900',
    difficultyHint: 'hard',
    estimatedTime: '8–12 mins',
    recommendedAge: '10–15 years',
    funFact: 'Black holes can warp space-time itself!',
    aiPreviewLine: 'AI will explain event horizons and cosmic mysteries safely.',
  },
  {
    id: 'space-exploration',
    title: 'Space Exploration',
    description:
      'Meet astronauts, rockets, and daring missions that push humanity into space.',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    difficultyHint: 'medium',
    estimatedTime: '6–8 mins',
    recommendedAge: '8–12 years',
    funFact: 'The International Space Station travels around Earth every 90 minutes!',
    aiPreviewLine: 'AI will show how humans explore beyond Earth.',
  },
  {
    id: 'astronomy-basics',
    title: 'Astronomy Basics',
    description:
      'Begin your journey into understanding telescopes, constellations, and space science.',
    icon: '🔭',
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    difficultyHint: 'easy',
    estimatedTime: '4–6 mins',
    recommendedAge: '6–10 years',
    funFact: 'Ancient civilizations used stars to navigate across oceans!',
    aiPreviewLine: 'AI will introduce you to the fundamentals of observing the universe.',
  },
];

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const TOPICS: EnhancedTopic[] = shuffleArray(BASE_TOPICS);

export const getTopic = (id: string): EnhancedTopic | undefined => {
  return BASE_TOPICS.find(topic => topic.id === id);
};
