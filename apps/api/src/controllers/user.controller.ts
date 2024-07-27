import { Request, Response } from 'express';
import prisma from '@/prisma';

export async function getAllUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findMany();

    return res.status(200).json({ message: 'Success', data: user });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Bad Request' });
  }
}
