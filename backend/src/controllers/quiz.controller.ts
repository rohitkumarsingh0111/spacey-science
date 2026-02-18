import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import { generateQuiz } from '../services/ai.service';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { userId, topic, difficulty } = req.body;

    if (!userId || !topic) {
      return res.status(400).json({ 
        success: false,
        error: 'userId and topic are required' 
      });
    }

    console.log(`Generating quiz for user ${userId}, topic: ${topic}, difficulty: ${difficulty || 'medium'}`);

    // Check if recent quiz exists (within 1 min)
    const recentQuiz = await Quiz.findOne({ 
      userId, 
      topic,
      generatedAt: { $gte: new Date(Date.now() - 60 * 1000) }
    }).sort({ generatedAt: -1 });
    
    if (recentQuiz) {
      console.log('Using cached quiz');
      return res.json({
        success: true,
        data: recentQuiz,
        cached: true
      });
    }

    // Generate new quiz using AI
    console.log('Generating new quiz with AI...');
    const questions = await generateQuiz(topic, difficulty || 'medium');

    const quiz = new Quiz({
      userId,
      topic,
      difficulty: difficulty || 'medium',
      questions,
    });

    await quiz.save();
    console.log('Quiz saved successfully');

    res.status(201).json({
      success: true,
      data: quiz,
      cached: false
    });
  } catch (error: any) {
    console.error('Quiz creation error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to create quiz' 
    });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ 
        success: false,
        error: 'Quiz not found' 
      });
    }
    
    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch quiz' 
    });
  }
};

export const getUserQuizzes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const quizzes = await Quiz.find({ userId })
      .sort({ generatedAt: -1 })
      .limit(20);
    
    res.json({
      success: true,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch quizzes' 
    });
  }
};