"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../models/userModel");
const database_1 = __importDefault(require("../../database"));
const userModel = new userModel_1.UserModel();
describe('User Model Tests', () => {
    const testUser = {
        first_name: 'raghad',
        last_name: 'taq',
        email: 'raghad@gmail.com',
        password: '123123'
    };
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
        await database_1.default.query('DELETE FROM users;');
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM users;');
    });
    it('should create a new user', async () => {
        const user = await userModel.create(testUser);
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
        const userId = users[0].id;
        if (!userId)
            fail('User id undefined');
        const user = await userModel.getById(userId);
        expect(user).not.toBeNull();
        expect(user?.email).toBe('raghad@gmail.com');
    });
    it('should authenticate the user', async () => {
        const auth = await userModel.authenticate('raghad@gmail.com', '123123');
        expect(auth).not.toBeNull();
        expect(auth.email).toBe('raghad@gmail.com');
    });
    it('should update and delete the user', async () => {
        const users = await userModel.getAll();
        const id = users[0].id;
        const updated = await userModel.update(id, { first_name: 'Eng.Raghad', last_name: 'Taq', email: 'raghadtaq@gmail.com' });
        expect(updated.first_name).toBe('Eng.Raghad');
        const deleted = await userModel.delete(id);
        expect(deleted.email).toBe('raghadtaq@gmail.com');
    });
});
