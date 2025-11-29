import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

export async function hashPassword(password: string): Promise<string> {
  const hashed = await bcrypt.hash(password + pepper, saltRounds);
  return hashed;
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password + pepper, hash);
}
