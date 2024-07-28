import { Request, Response } from 'express';
import prisma from '@/prisma';
import { addMonths } from 'date-fns';

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

  async getEventDataByFilter(req: Request, res: Response) {
    const { category, label, page = 1, pageSize = 12 } = req.query;

    try {
      const filters: any = {};

      // Menambahkan filter untuk kategori jika ada
      if (category) {
        filters.category = String(category);
      }

      // Menambahkan filter untuk label jika ada
      if (label) {
        if (label === 'premiere') {
          filters.premiere = true;
        } else if (label === 'upcoming') {
          const now = new Date();
          const threeMonthsFromNow = addMonths(now, 3);
          filters.dateTime = {
            gte: now,
            lte: threeMonthsFromNow,
          };
        }
      }

      let events;

      // Jika tidak ada filter category dan label, ambil semua event
      if (!category && !label) {
        events = await prisma.event.findMany({
          skip: (Number(page) - 1) * Number(pageSize),
          take: Number(pageSize),
        });
      } else {
        events = await prisma.event.findMany({
          where: filters,
          skip: (Number(page) - 1) * Number(pageSize),
          take: Number(pageSize),
        });
      }

      return res.status(200).json({ events });
    } catch (error) {
      console.error('Error fetching events by filter:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async searchEvents(req: Request, res: Response) {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ message: 'Query parameter "name" is required' });
    }

    try {
      // Ambil semua event terlebih dahulu
      const events = await prisma.event.findMany({
        where: {
          name: {
            contains: name as string,
          },
        },
        take: 10,
      });

      // Filter case-insensitive pada level aplikasi
      const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes((name as string).toLowerCase()),
      );

      if (filteredEvents.length === 0) {
        return res.status(404).json({ message: 'No events found' });
      }

      return res.status(200).json({ events: filteredEvents });
    } catch (error) {
      console.error('Error searching events:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // async getEventDataByFilter(req: Request, res: Response) {
  //   const { id } = req.params;

  //   const event = await prisma.event.findMany({
  //     where: { id: Number(id) },
  //   });

  //   if (!event) {
  //     return res.send(404);
  //   }

  //   return res.status(200).send(event);
  // }

  // async createEventData(req: Request, res: Response) {
  //   const { name, code } = req.body;

  //   const newEventData = await prisma.event.create({
  //     data: { name, code },
  //   });

  //   return res.status(201).send(newEventData);
  // }
}
