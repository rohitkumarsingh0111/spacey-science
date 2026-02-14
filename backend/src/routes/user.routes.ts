import express from 'express';
import { authUser, getUserById, updateUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/auth', authUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);

export default router;