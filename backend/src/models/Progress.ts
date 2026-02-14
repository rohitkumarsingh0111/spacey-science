import mongoose, { Schema, Document } from 'mongoose';

interface IAnswer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
}

export interface IProgress extends Document {
  userId: string;
  quizId: string;
  topic: string;
  answers: IAnswer[];
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
  badgeAwarded?: string;
}

const AnswerSchema = new Schema({
  questionIndex: { type: Number, required: true },
  answer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
}, { _id: false });

const ProgressSchema = new Schema<IProgress>({
  userId: { type: String, required: true, index: true },
  quizId: { type: String, required: true },
  topic: { type: String, required: true },
  answers: [AnswerSchema],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
  badgeAwarded: { type: String }
});

// Index for efficient user progress queries
ProgressSchema.index({ userId: 1, completedAt: -1 });

export default mongoose.model<IProgress>('Progress', ProgressSchema);