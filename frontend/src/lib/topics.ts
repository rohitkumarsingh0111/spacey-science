import { Topic } from '@/types/types';

export const TOPICS: Topic[] = [
  {
    id: 'solar-system',
    title: 'Solar System',
    description: 'Explore the 8 planets and our amazing Sun!',
    icon: '🪐',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
  },
  {
    id: 'moon',
    title: 'The Moon',
    description: 'Learn about Earth\'s closest neighbor in space',
    icon: '🌙',
    color: 'from-gray-400 to-gray-600',
    gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  },
  {
    id: 'mars',
    title: 'Mars',
    description: 'Discover the Red Planet and its mysteries',
    icon: '🔴',
    color: 'from-red-600 to-orange-600',
    gradient: 'bg-gradient-to-br from-red-600 to-orange-600',
  },
  {
    id: 'stars',
    title: 'Stars',
    description: 'Find out how stars are born and shine',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-600',
    gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  },
  {
    id: 'galaxies',
    title: 'Galaxies',
    description: 'Journey through the Milky Way and beyond',
    icon: '🌌',
    color: 'from-purple-600 to-indigo-600',
    gradient: 'bg-gradient-to-br from-purple-600 to-indigo-600',
  },
  {
    id: 'black-holes',
    title: 'Black Holes',
    description: 'Explore the most mysterious objects in space',
    icon: '🕳️',
    color: 'from-black to-purple-900',
    gradient: 'bg-gradient-to-br from-black to-purple-900',
  },
  {
    id: 'space-exploration',
    title: 'Space Exploration',
    description: 'Learn about astronauts, rockets, and missions',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    id: 'astronomy-basics',
    title: 'Astronomy Basics',
    description: 'Start your journey to becoming a space expert',
    icon: '🔭',
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  },
];

export const getTopic = (id: string): Topic | undefined => {
  return TOPICS.find(topic => topic.id === id);
};