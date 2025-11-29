import { ProductModel } from '../../models/productModel';
import { CategoryModel } from '../../models/categoryModel';
import pool from '../../database';

const productModel = new ProductModel();
const categoryModel = new CategoryModel();

describe('Product Model Tests', () => {
  let catId: number;

  beforeAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');

    const c = await categoryModel.create({ name: 'TestCat' });
    catId = c.id!;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
  });

  it('should create a product', async () => {
    const created = await productModel.create({ name: 'Phone', description: 'A phone', price: 1000, category_id: catId });
    expect(created).toBeDefined();
    expect(created.name).toBe('Phone');
    expect(created.id).toBeDefined();
  });

  it('should list products', async () => {
    const products = await productModel.getAll();
    expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it('should get by id, update and delete', async () => {
    const products = await productModel.getAll();
    const id = products[0].id!;
    const p = await productModel.getById(id);
    expect(p?.name).toBe('Phone');

    const updated = await productModel.update(id, { name: 'Phone X', price: 500 });
    expect(updated.name).toBe('Phone X');

    const deleted = await productModel.delete(id);
    expect(deleted.name).toBe('Phone X');
  });
});
