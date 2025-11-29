import supertest from 'supertest';
import app from '../../app';
import pool from '../../database';

const request = supertest(app);

describe('Users Handler', () => {
  const testUser = {
    first_name: 'raghad',
    last_name: 'taq',
    email: 'raghad@gmail.com',
    password: '123123'
  };

  beforeAll(async () => {
    await pool.query('DELETE FROM users;');
  });

  afterAll(async () => {
    await pool.query('DELETE FROM users;');
  });

  it('POST /users/signup -> signup', async () => {
    const res = await request.post('/users/signup').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(testUser.email);
  });

  it('POST /users/login -> login and receive token', async () => {
    const res = await request.post('/users/login').send({ email: testUser.email, password: testUser.password });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
