// routes/auth/auth.routes.ts

import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/api/auth/google', authController.googleLogin);
router.get('/api/auth/user', authController.getUser);
router.post('/api/auth/logout', authController.logout);

export default router;
