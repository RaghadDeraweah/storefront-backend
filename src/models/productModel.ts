import pool from '../database';

export type Product = {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category_id?: number | null;
};

export class ProductModel {
  async create(product: Product): Promise<Product> {
    const result = await pool.query(
      `
      INSERT INTO products (name, description, price, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, description, price, category_id
      `,
      [product.name, product.description, product.price, product.category_id]
    );
    return result.rows[0];
  }

  async getAll(): Promise<Product[]> {
    const result = await pool.query(`
      SELECT id, name, description, price, category_id
      FROM products
      ORDER BY id
    `);
    return result.rows;
  }

  async getById(id: number): Promise<Product | null> {
    const result = await pool.query(
      `
      SELECT id, name, description, price, category_id
      FROM products
      WHERE id=$1
      `,
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    const result = await pool.query(
      `
      UPDATE products
      SET name=$1, description=$2, price=$3, category_id=$4
      WHERE id=$5
      RETURNING id, name, description, price, category_id
      `,
      [data.name, data.description, data.price, data.category_id, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<Product> {
    const result = await pool.query(
      `
      DELETE FROM products
      WHERE id=$1
      RETURNING id, name, description, price, category_id
      `,
      [id]
    );
    return result.rows[0];
  }
}
