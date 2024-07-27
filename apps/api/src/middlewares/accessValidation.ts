import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserData } from '@/interfaces/UserData';

interface ValidationRequest extends Request {
  userData: UserData;
}

export function accessValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Need Tokens' });
  }

  const token = authorization.split(' ')[1]; // Bearer Token
  const secret = process.env.JWT_SECRET!;

  try {
    const jwtDecode = jwt.verify(token, secret);

    validationReq.userData = jwtDecode as UserData;
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}
