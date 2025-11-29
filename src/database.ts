import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT, 
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  NODE_ENV
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: NODE_ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
});

export default client;
