import pool from '../database';

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductModel {

  async addProduct(item: OrderProduct): Promise<OrderProduct> {
    const result = await pool.query(
      `
      INSERT INTO order_products (order_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING id, order_id, product_id, quantity
      `,
      [item.order_id, item.product_id, item.quantity]
    );

    return result.rows[0];
  }

  async getItemsByOrder(orderId: number): Promise<OrderProduct[]> {
    const result = await pool.query(
      `
      SELECT id, order_id, product_id, quantity
      FROM order_products
      WHERE order_id=$1
      ORDER BY id
      `,
      [orderId]
    );

    return result.rows;
  }

  async getById(id: number): Promise<OrderProduct | null> {
    const result = await pool.query(
      `
      SELECT id, order_id, product_id, quantity
      FROM order_products
      WHERE id=$1
      `,
      [id]
    );

    return result.rows[0] || null;
  }

  async update(id: number, quantity: number): Promise<OrderProduct> {
    const result = await pool.query(
      `
      UPDATE order_products
      SET quantity=$1
      WHERE id=$2
      RETURNING id, order_id, product_id, quantity
      `,
      [quantity, id]
    );

    return result.rows[0];
  }

  async delete(id: number): Promise<OrderProduct> {
    const result = await pool.query(
      `
      DELETE FROM order_products
      WHERE id=$1
      RETURNING id, order_id, product_id, quantity
      `,
      [id]
    );

    return result.rows[0];
  }
}
