import { Router } from 'express';
import { User } from '../controllers/userController';
import { UserMiddleware } from '../middleware/UserMiddleware';

const router = Router();

router.get('/protected', UserMiddleware, User);

export default router;