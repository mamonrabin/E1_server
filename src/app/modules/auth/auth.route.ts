import express from 'express';
// import { userController } from '../user/user.controller';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/signup', (req, res, next) => {
  Promise.resolve(authController.signUp(req, res, next)).catch(next);
});

router.post('/login', (req, res, next) => {
  Promise.resolve(authController.signIn(req, res, next)).catch(next);
});

export const authRoutes = router;
