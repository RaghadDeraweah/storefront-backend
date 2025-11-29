import supertest from 'supertest';
import app from '../../app';
import pool from '../../database';
import { UserModel } from '../../models/userModel';
import { CategoryModel } from '../../models/categoryModel';
import { ProductModel } from '../../models/productModel';
import { OrderModel } from '../../models/orderModel';

const request = supertest(app);

describe('OrderProducts Handler', () => {
  let token = '';
  let orderId = 0;
  let productId = 0;

  beforeAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
    await pool.query('DELETE FROM users;');

    const userModel = new UserModel();
    const user = await userModel.create({ first_name: 'raghad', last_name: 'taq', email: 'raghad@gmail.com', password: '123123' } as any);

    const loginRes = await request.post('/users/login').send({ email: 'raghad@gmail.com', password: '123123' });
    token = loginRes.body.token;

    const cModel = new CategoryModel();
    const cat = await cModel.create({ name: 'Devices' });

    const pModel = new ProductModel();
    const prod = await pModel.create({ name: 'PC', price: 1000, category_id: cat.id! });

    const oModel = new OrderModel();
    const order = await oModel.create({ user_id: user.id!, status: 'active' });

    productId = prod.id!;
    orderId = order.id!;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
    await pool.query('DELETE FROM users;');
  });

  it('POST /order-products without token should 401', async () => {
    const res = await request.post('/order-products').send({ order_id: orderId, product_id: productId, quantity: 1 });
    expect(res.status).toBe(401);
  });

  it('POST /order-products with token should create', async () => {
    const res = await request.post('/order-products').set('Authorization', `Bearer ${token}`).send({ order_id: orderId, product_id: productId, quantity: 2 });
    expect([200,201].includes(res.status)).toBeTrue();
  });
});
