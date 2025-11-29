import pool from '../database';

export type Category = {
  id?: number;
  name: string;
};

export class CategoryModel {
  async create(category: Category): Promise<Category> {
    const result = await pool.query(
      `INSERT INTO categories (name)
       VALUES ($1)
       RETURNING id, name`,
      [category.name]
    );
    return result.rows[0];
  }

  async getAll(): Promise<Category[]> {
    const result = await pool.query(
      `SELECT id, name FROM categories ORDER BY id`
    );
    return result.rows;
  }

  async getById(id: number): Promise<Category | null> {
    const result = await pool.query(
      `SELECT id, name FROM categories WHERE id=$1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: number, data: Partial<Category>): Promise<Category> {
    const result = await pool.query(
      `
      UPDATE categories
      SET name=$1
      WHERE id=$2
      RETURNING id, name
      `,
      [data.name, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<Category> {
    const result = await pool.query(
      `
      DELETE FROM categories
      WHERE id=$1
      RETURNING id, name
      `,
      [id]
    );
    return result.rows[0];
  }
}
