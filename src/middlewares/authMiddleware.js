"use strict";
/*import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.TOKEN_SECRET as string;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const authService_1 = require("../services/authService");
function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ message: 'Authorization header missing' });
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Authorization header must be: Bearer <token>' });
        }
        const token = parts[1];
        const payload = (0, authService_1.verifyToken)(token);
        // attach userId to request (use any to avoid TS global augmentation here)
        req.userId = payload.userId ?? payload.id ?? null;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
    }
}
/*
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Authorization header must be: Bearer <token>' });
    }

    const token = parts[1];
    const payload = verifyToken(token);

    // attach userId to request (cast req to any)
    (req as any).userId = payload.userId ?? payload.id ?? null;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token', error: (err as Error).message });
  }
}
*/ 
