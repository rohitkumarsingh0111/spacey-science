import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api' || 'https://spacey-science.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds for AI generation
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// User APIs
export const authUser = (name: string, email: string) =>
  api.post('/users/auth', { name, email });

export const getUser = (userId: string) =>
  api.get(`/users/${userId}`);

export const updateUser = (userId: string, updates: any) =>
  api.patch(`/users/${userId}`, updates);

// Quiz APIs
export const generateQuiz = (userId: string, topic: string, difficulty?: string) =>
  api.post('/quiz/generate', { userId, topic, difficulty });

export const getQuiz = (quizId: string) =>
  api.get(`/quiz/${quizId}`);

export const getUserQuizzes = (userId: string) =>
  api.get(`/quiz/user/${userId}`);

// Progress APIs
export const saveProgress = (data: {
  userId: string;
  quizId: string;
  topic: string;
  answers: { questionIndex: number; answer: string; isCorrect: boolean }[];
  score: number;
  totalQuestions: number;
}) => api.post('/progress/save', data);

export const getUserProgress = (userId: string) =>
  api.get(`/progress/user/${userId}`);

export const getProgressStats = (userId: string) =>
  api.get(`/progress/stats/${userId}`);

// Health check
export const healthCheck = () =>
  api.get('/health');