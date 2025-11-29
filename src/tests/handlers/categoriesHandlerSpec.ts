import supertest from 'supertest';
import app from '../../app';
import pool from '../../database';

const request = supertest(app);

describe('Categories Handler', () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM categories;');
  });

  afterAll(async () => {
    await pool.query('DELETE FROM categories;');
  });

  it('POST /categories (protected) should fail without token', async () => {
    const res = await request.post('/categories').send({ name: 'Electro' });
    expect(res.status).toBe(401);
  });

  it('GET /categories should return array', async () => {
    const res = await request.get('/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
  });
});
