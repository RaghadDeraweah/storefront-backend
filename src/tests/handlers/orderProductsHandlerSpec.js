"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../database"));
const userModel_1 = require("../../models/userModel");
const categoryModel_1 = require("../../models/categoryModel");
const productModel_1 = require("../../models/productModel");
const orderModel_1 = require("../../models/orderModel");
const request = (0, supertest_1.default)(app_1.default);
describe('OrderProducts Handler', () => {
    let token = '';
    let orderId = 0;
    let productId = 0;
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
        await database_1.default.query('DELETE FROM users;');
        const userModel = new userModel_1.UserModel();
        const user = await userModel.create({ first_name: 'raghad', last_name: 'taq', email: 'raghad@gmail.com', password: '123123' });
        const loginRes = await request.post('/users/login').send({ email: 'raghad@gmail.com', password: '123123' });
        token = loginRes.body.token;
        const cModel = new categoryModel_1.CategoryModel();
        const cat = await cModel.create({ name: 'Devices' });
        const pModel = new productModel_1.ProductModel();
        const prod = await pModel.create({ name: 'PC', price: 1000, category_id: cat.id });
        const oModel = new orderModel_1.OrderModel();
        const order = await oModel.create({ user_id: user.id, status: 'active' });
        productId = prod.id;
        orderId = order.id;
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
        await database_1.default.query('DELETE FROM users;');
    });
    it('POST /order-products without token should 401', async () => {
        const res = await request.post('/order-products').send({ order_id: orderId, product_id: productId, quantity: 1 });
        expect(res.status).toBe(401);
    });
    it('POST /order-products with token should create', async () => {
        const res = await request.post('/order-products').set('Authorization', `Bearer ${token}`).send({ order_id: orderId, product_id: productId, quantity: 2 });
        expect([200, 201].includes(res.status)).toBeTrue();
    });
});
