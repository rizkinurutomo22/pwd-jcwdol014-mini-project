import { Request, Response } from 'express';
import { handleTransaction } from '@/utils/handleTransaction';
import prisma from '@/prisma';

export async function purchase(req: Request, res: Response) {
  const { userId, eventId, totalTickets } = req.body;

  try {
    const purchase = await handleTransaction(userId, eventId, totalTickets);
    return res.status(200).json({ message: 'Success', data: purchase });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while processing the transaction' });
  }
}

export async function checkout(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const checkout = await prisma.purchase.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        event: true,
      },
    });

    if (!checkout) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    return res.status(200).json({
      username: checkout.user.username,
      email: checkout.user.email,
      eventName: checkout.event.name,
      totalTickets: checkout.totalTickets,
      totalPrice: checkout.totalPrice,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getPurchaseByOrganizerId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: { organizerId: parseInt(id) },
      include: {
        purchases: {
          include: {
            user: true,
            event: true,
          },
        },
      },
    });

    const purchases = events.flatMap((event) => event.purchases);

    return res.status(200).json({ message: 'Success', data: purchases });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching purchases', error });
  }
}
