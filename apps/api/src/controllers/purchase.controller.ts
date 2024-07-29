import { Request, Response } from 'express';
import { handleTransaction } from '@/utils/handleTransaction';

export default async function purchase(req: Request, res: Response) {
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
