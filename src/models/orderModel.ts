import pool from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status?: string;
};

export class OrderModel {

  async create(order: Order): Promise<Order> {
    const result = await pool.query(
      `
      INSERT INTO orders (user_id, status)
      VALUES ($1, $2)
      RETURNING id, user_id, status
      `,
      [order.user_id, order.status ?? 'active']
    );
    return result.rows[0];
  }

  async getAll(): Promise<Order[]> {
    const result = await pool.query(`
      SELECT id, user_id, status
      FROM orders
      ORDER BY id
    `);
    return result.rows;
  }

  async getById(id: number): Promise<Order | null> {
    const result = await pool.query(
      `
      SELECT id, user_id, status
      FROM orders
      WHERE id=$1
      `,
      [id]
    );
    return result.rows[0] || null;
  }

  async getByUser(userId: number): Promise<Order[]> {
    const result = await pool.query(
      `
      SELECT id, user_id, status
      FROM orders
      WHERE user_id=$1
      ORDER BY id
      `,
      [userId]
    );
    return result.rows;
  }

  async getActiveOrder(userId: number): Promise<Order | null> {
    const result = await pool.query(
      `
      SELECT id, user_id, status
      FROM orders
      WHERE user_id=$1 AND status='active'
      LIMIT 1
      `,
      [userId]
    );
    return result.rows[0] || null;
  }

  async update(id: number, data: Partial<Order>): Promise<Order> {
    const result = await pool.query(
      `
      UPDATE orders
      SET status=$1
      WHERE id=$2
      RETURNING id, user_id, status
      `,
      [data.status, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<Order> {
    const result = await pool.query(
      `
      DELETE FROM orders
      WHERE id=$1
      RETURNING id, user_id, status
      `,
      [id]
    );
    return result.rows[0];
  }
}
