// src/types.ts

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Progress {
  userId: string;
  completedLessons: number;
  score: number;
}

export interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
}
