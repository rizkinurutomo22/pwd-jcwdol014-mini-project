import purchase from '@/controllers/purchase.controller';
import { Router } from 'express';

const router = Router();

router.post('/purchase', purchase);

export default router;
