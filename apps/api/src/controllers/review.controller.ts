import { Request, Response } from 'express';
import prisma from '@/prisma';

export class ReviewController {
  async createReviewData(req: Request, res: Response) {
    const { event_id, reviewed_by, rating, review, suggestions } = req.body;

    const newReviewData = await prisma.review.create({
      data: {
        event_id,
        reviewed_by,
        rating,
        review,
        suggestions,
      },
    });

    return res.status(201).send(newReviewData);
  }
}
