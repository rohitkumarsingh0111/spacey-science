import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  totalScore: number;
  badges: string[];
  completedLessons: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  avatar: { type: String, default: '' },
  totalScore: { type: Number, default: 0 },
  badges: [{ type: String }],
  completedLessons: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);