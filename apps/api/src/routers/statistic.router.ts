import { purchaseStatistic } from '@/controllers/statistic.controller';
import { Router } from 'express';

const router = Router();

router.get('/:id', purchaseStatistic);

export default router;
