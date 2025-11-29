"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../database"));
const userModel_1 = require("../../models/userModel");
const request = (0, supertest_1.default)(app_1.default);
describe('Orders Handler', () => {
    let token = '';
    let userId = 0;
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM users;');
        const userModel = new userModel_1.UserModel();
        const u = await userModel.create({ first_name: 'raghad', last_name: 'taq', email: 'raghad@gmail.com', password: '123123' });
        userId = u.id;
        const loginRes = await request.post('/users/login').send({ email: 'raghad@gmail.com', password: '123123' });
        token = loginRes.body.token;
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM users;');
    });
    it('POST /orders without token should 401', async () => {
        const res = await request.post('/orders').send({ user_id: userId, status: 'active' });
        expect(res.status).toBe(401);
    });
    it('POST /orders with token should create', async () => {
        const res = await request.post('/orders').set('Authorization', `Bearer ${token}`).send({ status: 'active' });
        expect([200, 201, 204].includes(res.status)).toBeTrue();
    });
});
