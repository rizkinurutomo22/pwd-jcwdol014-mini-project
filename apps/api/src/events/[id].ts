import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  // Memastikan id adalah string dan dapat dikonversi ke number
  if (typeof id !== 'string' || isNaN(Number(id))) {
    res.status(400).json({ message: 'Invalid event ID' });
    return;
  }

  try {
    // Mencari event berdasarkan ID menggunakan Prisma
    const event = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (event) {
      res.status(200).json({ event });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
