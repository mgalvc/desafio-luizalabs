import AuthController from '../controllers/auth.controller';
import { Router } from 'express';

const router = Router();

const authController = new AuthController();

router.post('/auth', authController.authenticate.bind(authController));

export default router;