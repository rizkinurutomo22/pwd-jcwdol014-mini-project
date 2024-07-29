import { Request, Response } from 'express';
import prisma from '@/prisma';

export async function purchaseStatistic(req: Request, res: Response) {
  const { id } = req.params;
  const { groupBy } = req.query;

  try {
    let groupByClause;
    switch (groupBy) {
      case 'year':
        groupByClause = { year: { createdAt: true } };
        break;
      case 'month':
        groupByClause = { month: { createdAt: true } };
        break;
      case 'day':
        groupByClause = { day: { createdAt: true } };
        break;
      default:
        groupByClause = { month: { createdAt: true } };
    }

    const purchases = await prisma.purchase.groupBy({
      by: ['eventId', 'createdAt'],
      where: {
        event: {
          organizerId: parseInt(id),
        },
      },
      _sum: {
        totalPrice: true,
        totalTickets: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}
