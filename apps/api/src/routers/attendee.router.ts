import { getAttendeesByOrganizerId } from '@/controllers/attendee.controller';
import { Router } from 'express';

const router = Router();

router.get('/:id', getAttendeesByOrganizerId);

export default router;
