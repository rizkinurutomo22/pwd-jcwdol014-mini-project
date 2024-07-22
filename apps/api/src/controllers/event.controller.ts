import { Request, Response } from 'express';
import prisma from '@/prisma';

export class EventController {
  async getEventData(req: Request, res: Response) {
    const eventData = await prisma.event.findMany();

    return res.status(200).send(eventData);
  }

  async getEventDataById(req: Request, res: Response) {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      return res.send(404);
    }

    return res.status(200).send(event);
  }

  // async createEventData(req: Request, res: Response) {
  //   const { name, code } = req.body;

  //   const newEventData = await prisma.event.create({
  //     data: { name, code },
  //   });

  //   return res.status(201).send(newEventData);
  // }
}
