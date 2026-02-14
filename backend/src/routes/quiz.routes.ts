import express from 'express';
import { createQuiz, getQuizById, getUserQuizzes } from '../controllers/quiz.controller';

const router = express.Router();

router.post('/generate', createQuiz);
router.get('/:id', getQuizById);
router.get('/user/:userId', getUserQuizzes);

export default router;