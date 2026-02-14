export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  totalScore: number;
  badges: string[];
  completedLessons: string[];
  createdAt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  _id: string;
  userId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  generatedAt: string;
}

export interface Answer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
}

export interface Progress {
  _id: string;
  userId: string;
  quizId: string;
  topic: string;
  answers: Answer[];
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  badgeAwarded?: string;
}

export interface BadgeInfo {
  name: string;
  threshold: number;
  icon: string;
  description: string;
}

export interface ProgressStats {
  totalScore: number;
  totalQuizzes: number;
  badges: string[];
  completedLessons: string[];
  nextBadge: {
    name: string;
    threshold: number;
    icon: string;
    description: string;
    progress: number;
    remaining: number;
  } | null;
  allBadges: BadgeInfo[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}