import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/prisma';
import { generateReferralCode } from '@/utils/generateReferralCode';

export async function register(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, email, password, referralCode, role } = req.body;

  try {
    let referrer;
    if (referralCode) {
      referrer = await prisma.user.findUnique({ where: { referralCode } });
      if (!referrer)
        return res.status(400).json({ message: 'Invalid referral code' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        referralCode: generateReferralCode(),
        referredBy: referrer ? { connect: { id: referrer.id } } : undefined,
      },
    });

    if (referrer) {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 3);

      await prisma.discount.create({
        data: {
          userId: newUser.id,
          discount: 10,
          expiresAt,
        },
      });

      await prisma.referral.create({
        data: {
          referrerId: referrer.id,
          referredUserId: newUser.id,
          referralCode,
          expiresAt,
          points: 10000,
        },
      });
    }

    return res.status(201).json({ message: 'Account Created', data: newUser });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: err });
  }
}

export async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return res.status(400).json({ message: 'Invalid Email or Password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Email or Password' });

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET!;
    const expiresIn = 60 * 60 * 1; // 1 hour

    const token = jwt.sign(payload, secret, {
      expiresIn: expiresIn,
    });

    return res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', errors: err });
  }
}
