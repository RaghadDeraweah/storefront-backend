import { CategoryModel } from '../../models/categoryModel';
import pool from '../../database';

const categoryModel = new CategoryModel();

describe('Category Model Tests', () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
  });

  afterAll(async () => {
    await pool.query('DELETE FROM categories;');
  });

  it('should create a category', async () => {
    const created = await categoryModel.create({ name: 'Electronics' });
    expect(created).toBeDefined();
    expect(created.name).toBe('Electronics');
    expect(created.id).toBeDefined();
  });

  it('should list categories', async () => {
    const cats = await categoryModel.getAll();
    expect(Array.isArray(cats)).toBeTrue();
    expect(cats.length).toBeGreaterThanOrEqual(1);
  });

  it('should get by id, update and delete', async () => {
    const cats = await categoryModel.getAll();
    const id = cats[0].id!;
    const cat = await categoryModel.getById(id);
    expect(cat?.name).toBe('Electronics');

    const updated = await categoryModel.update(id, { name: 'Devices' });
    expect(updated.name).toBe('Devices');

    const deleted = await categoryModel.delete(id);
    expect(deleted.name).toBe('Devices');
  });
});
