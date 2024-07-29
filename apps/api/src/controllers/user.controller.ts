import { Request, Response } from 'express';
import prisma from '@/prisma';

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Success', data: user });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Bad Request' });
  }
}
