"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../../models/orderModel");
const userModel_1 = require("../../models/userModel");
const database_1 = __importDefault(require("../../database"));
const orderModel = new orderModel_1.OrderModel();
const userModel = new userModel_1.UserModel();
describe('Order Model Tests', () => {
    let userId;
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM users;');
        const u = await userModel.create({ first_name: 'Raghad', last_name: 'Taq', email: 'raghad@gmail.com', password: '123123' });
        userId = u.id;
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM users;');
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
        const id = orders[0].id;
        const ord = await orderModel.getById(id);
        expect(ord?.status).toBeDefined();
        const updated = await orderModel.update(id, { status: 'complete' });
        expect(updated.status).toBe('complete');
        const deleted = await orderModel.delete(id);
        expect(deleted.id).toBe(id);
    });
});
