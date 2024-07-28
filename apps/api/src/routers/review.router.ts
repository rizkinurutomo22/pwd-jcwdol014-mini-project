import { ReviewController } from '@/controllers/review.controller';
import { Router } from 'express';

export class ReviewRouter {
  private router: Router;
  private reviewController: ReviewController;

  constructor() {
    this.reviewController = new ReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.reviewController.createReviewData);
  }

  getRouter(): Router {
    return this.router;
  }
}
