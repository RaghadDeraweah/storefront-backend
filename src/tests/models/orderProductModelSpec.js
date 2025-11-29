"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderProductModel_1 = require("../../models/orderProductModel");
const orderModel_1 = require("../../models/orderModel");
const productModel_1 = require("../../models/productModel");
const userModel_1 = require("../../models/userModel");
const categoryModel_1 = require("../../models/categoryModel");
const database_1 = __importDefault(require("../../database"));
const orderProductModel = new orderProductModel_1.OrderProductModel();
const orderModel = new orderModel_1.OrderModel();
const productModel = new productModel_1.ProductModel();
const userModel = new userModel_1.UserModel();
const categoryModel = new categoryModel_1.CategoryModel();
describe('OrderProduct Model Tests', () => {
    let orderId;
    let productId;
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
        await database_1.default.query('DELETE FROM users;');
        const u = await userModel.create({ first_name: 'raghad', last_name: 'taq', email: 'raghad@gmail.com', password: '123123' });
        const c = await categoryModel.create({ name: 'Devices' });
        const p = await productModel.create({ name: 'PC', description: 'pc', price: 1000, category_id: c.id });
        const o = await orderModel.create({ user_id: u.id, status: 'active' });
        orderId = o.id;
        productId = p.id;
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
        await database_1.default.query('DELETE FROM users;');
    });
    it('should add product to order', async () => {
        const added = await orderProductModel.addProduct({ order_id: orderId, product_id: productId, quantity: 2 });
        expect(added).toBeDefined();
        expect(added.quantity).toBe(2);
    });
    it('should list items by order and update/delete', async () => {
        const items = await orderProductModel.getItemsByOrder(orderId);
        expect(items.length).toBeGreaterThanOrEqual(1);
        const id = items[0].id;
        const updated = await orderProductModel.update(id, 5);
        expect(updated.quantity).toBe(5);
        const deleted = await orderProductModel.delete(id);
        expect(deleted.id).toBe(id);
    });
});
