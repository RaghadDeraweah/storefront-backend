import { UserModel } from '../../models/userModel';
import pool from '../../database';

const userModel = new UserModel();

describe('User Model Tests', () => {
  const testUser = {
    first_name: 'raghad',
    last_name: 'taq',
    email: 'raghad@gmail.com',
    password: '123123'
  };

  beforeAll(async () => {
    await pool.query('DELETE FROM order_products;');
    await pool.query('DELETE FROM orders;');
    await pool.query('DELETE FROM products;');
    await pool.query('DELETE FROM categories;');
    await pool.query('DELETE FROM users;');
  });

  afterAll(async () => {
    await pool.query('DELETE FROM users;');
  });

  it('should create a new user', async () => {
    const user = await userModel.create(testUser as any);
    expect(user).toBeDefined();
    expect(user.email).toBe('raghad@gmail.com');
    expect(user.id).toBeDefined();
  });

  it('should return all users', async () => {
    const users = await userModel.getAll();
    expect(Array.isArray(users)).toBeTrue();
    expect(users.length).toBeGreaterThanOrEqual(1);
  });

  it('should return a user by ID', async () => {
    const users = await userModel.getAll();
    const userId = users[0].id!;
    if (!userId) fail('User id undefined');
    const user = await userModel.getById(userId);
    expect(user).not.toBeNull();
    expect(user?.email).toBe('raghad@gmail.com');
  });

  it('should authenticate the user', async () => {
    const auth = await userModel.authenticate('raghad@gmail.com', '123123');
    expect(auth).not.toBeNull();
    expect((auth as any).email).toBe('raghad@gmail.com');
  });

  it('should update and delete the user', async () => {
    const users = await userModel.getAll();
    const id = users[0].id!;
    const updated = await userModel.update(id, { first_name: 'Eng.Raghad', last_name: 'Taq', email: 'raghadtaq@gmail.com' } as any);
    expect(updated.first_name).toBe('Eng.Raghad');

    const deleted = await userModel.delete(id);
    expect(deleted.email).toBe('raghadtaq@gmail.com');
  });
});
