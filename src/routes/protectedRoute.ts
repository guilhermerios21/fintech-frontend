import { Router } from 'express';
import * as protectedController from '../controllers/protectedController';
import {protectedMiddleware} from '../middleware/protectedMiddleware';

const router = Router();

router.get('/protected', protectedMiddleware, protectedController.protectedAccess);

export default router;