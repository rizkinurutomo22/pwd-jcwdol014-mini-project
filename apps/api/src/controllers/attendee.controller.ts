import prisma from '@/prisma';
import { Request, Response } from 'express';

export async function getAttendeesByOrganizerId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: { organizerId: parseInt(id) },
      include: {
        attendees: {
          include: {
            user: true,
          },
        },
      },
    });

    const attendees = events.flatMap((event) =>
      event.attendees.map((attendee) => ({
        eventName: event.name,
        username: attendee.user.username,
        email: attendee.user.email,
      })),
    );

    return res.status(200).json({ message: 'Success', data: attendees });
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
