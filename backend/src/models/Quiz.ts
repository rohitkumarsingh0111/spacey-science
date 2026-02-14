import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface IQuiz extends Document {
  userId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: IQuestion[];
  generatedAt: Date;
}

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, required: true }
}, { _id: false });

const QuizSchema = new Schema<IQuiz>({
  userId: { type: String, required: true, index: true },
  topic: { type: String, required: true, index: true },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    default: 'medium' 
  },
  questions: [QuestionSchema],
  generatedAt: { type: Date, default: Date.now }
});

// Compound index for efficient querying
QuizSchema.index({ userId: 1, topic: 1, generatedAt: -1 });

export default mongoose.model<IQuiz>('Quiz', QuizSchema);