/*import client from '../database';
import { hashPassword, comparePassword } from '../utils/hash';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  created_at?: string;
};

export class UserStore {
  async create(u: User): Promise<Omit<User, 'password'>> {
    const conn = await client.connect();
    try {
      const hashed = await hashPassword(u.password as string);
      const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4) RETURNING id, first_name, last_name, email, created_at;`;
      const result = await conn.query(sql, [u.first_name, u.last_name, u.email, hashed]);
      return result.rows[0];
    } finally {
      conn.release();
    }
  }

  async index(): Promise<Omit<User, 'password'>[]> {
    const conn = await client.connect();
    try {
      const sql = `SELECT id, first_name, last_name, email, created_at FROM users ORDER BY id;`;
      const result = await conn.query(sql);
      return result.rows;
    } finally {
      conn.release();
    }
  }

  async show(id: number): Promise<Omit<User, 'password'> | null> {
    const conn = await client.connect();
    try {
      const sql = `SELECT id, first_name, last_name, email, created_at FROM users WHERE id = $1;`;
      const result = await conn.query(sql, [id]);
      return result.rows[0] ?? null;
    } finally {
      conn.release();
    }
  }

  async authenticate(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const conn = await client.connect();
    try {
      const sql = `SELECT id, first_name, last_name, email, password FROM users WHERE email = $1;`;
      const result = await conn.query(sql, [email]);
      const user = result.rows[0];
      if (!user) return null;
      const ok = await comparePassword(password, user.password);
      if (!ok) return null;
      // return user without password
      const { password: _p, ...rest } = user;
      return rest;
    } finally {
      conn.release();
    }
  }
}
*/
import pool from '../database';
import { hashPassword, comparePassword } from '../utils/hash';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class UserModel {

  async create(user: User): Promise<User> {
    const hashed = await hashPassword(user.password);

    const result = await pool.query(
      `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, first_name, last_name, email
      `,
      [user.first_name, user.last_name, user.email, hashed]
    );

    return result.rows[0];
  }


  async getAll(): Promise<User[]> {
    const result = await pool.query(`
      SELECT id, first_name, last_name, email FROM users
    `);
    return result.rows;
  }


  async getById(id: number): Promise<User | null> {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email FROM users WHERE id=$1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const result = await pool.query(
      `
      UPDATE users
      SET first_name=$1, last_name=$2, email=$3
      WHERE id=$4
      RETURNING id, first_name, last_name, email
      `,
      [user.first_name, user.last_name, user.email, id]
    );
    return result.rows[0];
  }


  async delete(id: number): Promise<User> {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id=$1
      RETURNING id, first_name, last_name, email
      `,
      [id]
    );
    return result.rows[0];
  }

  // LOGIN 
  async authenticate(email: string, password: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    );

    if (result.rows.length === 0) return null;

    const user = result.rows[0];

    const valid = await comparePassword(password, user.password);
    if (!valid) return null;

    return user;
  }
}
