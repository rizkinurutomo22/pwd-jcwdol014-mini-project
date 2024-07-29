import {
  checkout,
  getPurchaseByOrganizerId,
  purchase,
} from '@/controllers/transaction.controller';
import { Router } from 'express';

const router = Router();

router.post('/purchase', purchase);
router.get('/:id', checkout);
router.get('/organizer/:id', getPurchaseByOrganizerId);

export default router;
