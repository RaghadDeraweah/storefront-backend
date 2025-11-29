import { OrderModel } from '../../models/orderModel';
import { UserModel } from '../../models/userModel';
import pool from '../../database';

const orderModel = new OrderModel();
const userModel = new UserModel();

describe('Order Model Tests', () => {
  let userId: number;

  beforeAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM users;');

    const u = await userModel.create({ first_name: 'Raghad', last_name: 'Taq', email: 'raghad@gmail.com', password: '123123' } as any);
    userId = u.id!;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM users;');
  });

  it('should create order', async () => {
    const o = await orderModel.create({ user_id: userId, status: 'active' });
    expect(o).toBeDefined();
    expect(o.user_id).toBe(userId);
    expect(o.status).toBe('active');
  });

  it('should list orders', async () => {
    const orders = await orderModel.getAll();
    expect(orders.length).toBeGreaterThanOrEqual(1);
  });

  it('should get by id, update and delete', async () => {
    const orders = await orderModel.getAll();
    const id = orders[0].id!;
    const ord = await orderModel.getById(id);
    expect(ord?.status).toBeDefined();

    const updated = await orderModel.update(id, { status: 'complete' });
    expect(updated.status).toBe('complete');

    const deleted = await orderModel.delete(id);
    expect(deleted.id).toBe(id);
  });
});
