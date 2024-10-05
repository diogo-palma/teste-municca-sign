import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data';

const secret = process.env.JWT_SECRET || 'default-secret';

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return; 
  }

  const passwordValid = password == user.password ?  true : false;

  if (!passwordValid) {
    res.status(401).json({ message: 'Invalid login' });
    return; 
  }

  const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

  res.json({ token });
  return; 
};
