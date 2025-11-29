/*import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

export function generateToken(payload: object) {
  return jwt.sign(payload, tokenSecret);
}

export function verifyToken(token: string) {
  return jwt.verify(token, tokenSecret);
}*/
import jwt from 'jsonwebtoken';
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default_secret';

export function generateToken(payload: object, expiresIn: string | number = '6h'): string {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn } as any);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, TOKEN_SECRET);
}


