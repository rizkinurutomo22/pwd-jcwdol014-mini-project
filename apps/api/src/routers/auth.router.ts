import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .not()
      .isLowercase()
      .not()
      .isUppercase()
      .not()
      .isNumeric()
      .not()
      .isAlpha()
      .withMessage(
        'Password must be at least 6 characters, have at least 1 lowercase letter, have at least 1 uppercase letter, have at least 1 non letter character',
      ),
  ],
  register,
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email or password'),
    body('password').exists().withMessage('Invalid email or password'),
  ],
  login,
);

export default router;
