import { OrderProductModel } from '../../models/orderProductModel';
import { OrderModel } from '../../models/orderModel';
import { ProductModel } from '../../models/productModel';
import { UserModel } from '../../models/userModel';
import { CategoryModel } from '../../models/categoryModel';
import pool from '../../database';

const orderProductModel = new OrderProductModel();
const orderModel = new OrderModel();
const productModel = new ProductModel();
const userModel = new UserModel();
const categoryModel = new CategoryModel();

describe('OrderProduct Model Tests', () => {
  let orderId: number;
  let productId: number;

  beforeAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
    await pool.query('DELETE FROM users;');

    const u = await userModel.create({ first_name: 'raghad', last_name: 'taq', email: 'raghad@gmail.com', password: '123123' } as any);
    const c = await categoryModel.create({ name: 'Devices' });
    const p = await productModel.create({ name: 'PC', description: 'pc', price: 1000, category_id: c.id! });

    const o = await orderModel.create({ user_id: u.id!, status: 'active' });

    orderId = o.id!;
    productId = p.id!;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
    await pool.query('DELETE FROM users;');
  });

  it('should add product to order', async () => {
    const added = await orderProductModel.addProduct({ order_id: orderId, product_id: productId, quantity: 2 });
    expect(added).toBeDefined();
    expect(added.quantity).toBe(2);
  });

  it('should list items by order and update/delete', async () => {
    const items = await orderProductModel.getItemsByOrder(orderId);
    expect(items.length).toBeGreaterThanOrEqual(1);

    const id = items[0].id!;
    const updated = await orderProductModel.update(id, 5);
    expect(updated.quantity).toBe(5);

    const deleted = await orderProductModel.delete(id);
    expect(deleted.id).toBe(id);
  });
});
