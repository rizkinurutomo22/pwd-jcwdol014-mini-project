import { Router } from 'express';
import { getAllUser } from '@/controllers/user.controller';
import { accessValidation } from '@/middlewares/accessValidation';

const router = Router();

router.get('/users', accessValidation, getAllUser);

export default router;
