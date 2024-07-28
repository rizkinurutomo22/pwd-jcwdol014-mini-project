import { Request, Response } from 'express';
import prisma from '@/prisma';

export class DashboardController {
  async createEventData(req: Request, res: Response) {
    const {
      name,
      type,
      price,
      seat,
      location,
      category,
      dateTime,
      thumbnail,
      description,
      updatedAt,
    } = req.body;

    const newEventData = await prisma.event.create({
      data: {
        name,
        type,
        price,
        seat,
        location,
        category,
        dateTime,
        thumbnail,
        description,
        updatedAt,
      },
    });

    return res.status(201).send(newEventData);
  }

  async createPromoData(req: Request, res: Response) {
    const {
      event_id,
      event_name,
      org_id,
      org_name,
      referal_code,
      discout,
      max_uses,
      remaining,
      valid_until,
      updatedAt,
    } = req.body;

    const newPromoData = await prisma.promo.create({
      data: {
        event_id,
        event_name,
        org_id,
        org_name,
        referal_code,
        discout,
        max_uses,
        remaining,
        valid_until,
        updatedAt,
      },
    });

    return res.status(201).send(newPromoData);
  }
}
