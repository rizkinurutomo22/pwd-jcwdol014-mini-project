import { EventController } from '@/controllers/event.controller';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/search', this.eventController.searchEvents);
    this.router.get('/filter', this.eventController.getEventDataByFilter);
    this.router.get('/:id', this.eventController.getEventDataById);
    this.router.get(
      '/organizer/:id',
      this.eventController.getEventByOrganizerId,
    );
    this.router.get('/', this.eventController.getEventData);
  }

  getRouter(): Router {
    return this.router;
  }
}
