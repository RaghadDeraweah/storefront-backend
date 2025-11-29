import supertest from 'supertest';
import app from '../../app';
import pool from '../../database';
import { CategoryModel } from '../../models/categoryModel';

const request = supertest(app);

describe('Products Handler', () => {
  let catId: number;

  beforeAll(async () => {
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
    const c = new CategoryModel();
    const created = await c.create({ name: 'TestCat' });
    catId = created.id!;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
  });

  it('GET /products returns array', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
  });

  it('POST /products without token should 401', async () => {
    const res = await request.post('/products').send({ name: 'X', price: 10, category_id: catId });
    expect(res.status).toBe(401);
  });
});
