"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default_secret';
function generateToken(payload, expiresIn = '6h') {
    return jsonwebtoken_1.default.sign(payload, TOKEN_SECRET, { expiresIn });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
}
