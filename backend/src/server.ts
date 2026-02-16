import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import quizRoutes from './routes/quiz.routes';
import progressRoutes from './routes/progress.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ========================
   CORS CONFIG
======================== */

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://172.30.11.43:5173',
      'https://spacey-science.vercel.app'
    ],
    credentials: true
  })
);

/* ========================
   MIDDLEWARE
======================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/* ========================
   ROOT HEALTH CHECK (IMPORTANT FOR RENDER)
======================== */

app.get('/', (_req, res) => {
  res.status(200).send('🚀 Spacey Science API Running');
});

/* ========================
   API HEALTH CHECK
======================== */

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Spacey Science API is running! 🚀',
    timestamp: new Date().toISOString()
  });
});

/* ========================
   ROUTES
======================== */

app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);

/* ========================
   404 HANDLER
======================== */

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

/* ========================
   ERROR HANDLER
======================== */

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Server Error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Internal server error'
    });
  }
);

/* ========================
   DATABASE + SERVER START
======================== */

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `📍 Environment: ${process.env.NODE_ENV || 'development'}`
      );
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    // ❗ DO NOT process.exit(1) on Render
  }
};

startServer();

export default app;
