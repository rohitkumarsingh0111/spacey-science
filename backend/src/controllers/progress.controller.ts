import { Request, Response } from 'express';
import Progress from '../models/Progress';
import User from '../models/User';

const BADGE_SYSTEM = [
  { name: 'Space Cadet', threshold: 1, icon: '🚀', description: 'Complete your first quiz!' },
  { name: 'Cosmic Explorer', threshold: 3, icon: '🌟', description: 'Complete 3 quizzes' },
  { name: 'Star Navigator', threshold: 5, icon: '⭐', description: 'Complete 5 quizzes' },
  { name: 'Galaxy Master', threshold: 10, icon: '🌌', description: 'Complete 10 quizzes' },
  { name: 'Universe Expert', threshold: 20, icon: '🌠', description: 'Complete 20 quizzes' },
];

export const saveProgress = async (req: Request, res: Response) => {
  try {
    const { userId, quizId, topic, answers, score, totalQuestions } = req.body;

    if (!userId || !quizId || !answers || score === undefined || !totalQuestions) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    // Get user's completed quiz count
    const completedCount = await Progress.countDocuments({ userId });
    const newCount = completedCount + 1;

    // Check for badge award
    let badgeAwarded: string | undefined;
    let badgeInfo: typeof BADGE_SYSTEM[0] | undefined;

    for (const badge of BADGE_SYSTEM) {
      if (newCount === badge.threshold) {
        badgeAwarded = badge.name;
        badgeInfo = badge;
        
        // Add badge to user
        await User.findByIdAndUpdate(
          userId, 
          { $addToSet: { badges: badge.name } }
        );
        break;
      }
    }

    // Save progress
    const progress = new Progress({
      userId,
      quizId,
      topic,
      answers,
      score,
      totalQuestions,
      percentage,
      badgeAwarded,
    });

    await progress.save();

    // Update user total score and completed lessons
    await User.findByIdAndUpdate(userId, { 
      $inc: { totalScore: score },
      $addToSet: { completedLessons: topic }
    });

    console.log(`Progress saved for user ${userId}. Score: ${score}/${totalQuestions} (${percentage}%)`);
    if (badgeAwarded) {
      console.log(`🎉 Badge awarded: ${badgeAwarded}`);
    }

    res.status(201).json({ 
      success: true,
      data: {
        ...progress.toObject(),
        badgeInfo: badgeInfo || null
      }
    });
  } catch (error: any) {
    console.error('Progress save error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to save progress' 
    });
  }
};

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const progress = await Progress.find({ userId })
      .sort({ completedAt: -1 })
      .limit(50);
    
    // Get statistics
    const totalQuizzes = progress.length;
    const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
    const averagePercentage = totalQuizzes > 0 
      ? Math.round(progress.reduce((sum, p) => sum + p.percentage, 0) / totalQuizzes)
      : 0;

    res.json({
      success: true,
      data: {
        progress,
        stats: {
          totalQuizzes,
          totalScore,
          averagePercentage
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch progress' 
    });
  }
};

export const getProgressStats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    const progress = await Progress.find({ userId });
    const totalQuizzes = progress.length;
    
    // Next badge calculation
    let nextBadge = null;
    for (const badge of BADGE_SYSTEM) {
      if (totalQuizzes < badge.threshold) {
        nextBadge = {
          ...badge,
          progress: totalQuizzes,
          remaining: badge.threshold - totalQuizzes
        };
        break;
      }
    }

    res.json({
      success: true,
      data: {
        totalScore: user.totalScore,
        totalQuizzes,
        badges: user.badges,
        completedLessons: user.completedLessons,
        nextBadge,
        allBadges: BADGE_SYSTEM
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch stats' 
    });
  }
};