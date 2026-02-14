import express from 'express';
import { saveProgress, getUserProgress, getProgressStats } from '../controllers/progress.controller';

const router = express.Router();

router.post('/save', saveProgress);
router.get('/user/:userId', getUserProgress);
router.get('/stats/:userId', getProgressStats);

export default router;