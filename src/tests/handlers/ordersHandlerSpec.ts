import supertest from 'supertest';
import app from '../../app';
import pool from '../../database';
import { UserModel } from '../../models/userModel';

const request = supertest(app);

describe('Orders Handler', () => {
  let token = '';
  let userId = 0;

  beforeAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM users;');

    const userModel = new UserModel();
    const u = await userModel.create({ first_name: 'raghad', last_name: 'taq', email: 'raghad@gmail.com', password: '123123' } as any);
    userId = u.id!;

    const loginRes = await request.post('/users/login').send({ email: 'raghad@gmail.com', password: '123123' });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM users;');
  });

  it('POST /orders without token should 401', async () => {
    const res = await request.post('/orders').send({ user_id: userId, status: 'active' });
    expect(res.status).toBe(401);
  });

  it('POST /orders with token should create', async () => {
    const res = await request.post('/orders').set('Authorization', `Bearer ${token}`).send({ status: 'active'});
    expect([200,201,204].includes(res.status)).toBeTrue();
  });
});
