"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../database"));
const categoryModel_1 = require("../../models/categoryModel");
const request = (0, supertest_1.default)(app_1.default);
describe('Products Handler', () => {
    let catId;
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
        const c = new categoryModel_1.CategoryModel();
        const created = await c.create({ name: 'TestCat' });
        catId = created.id;
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
    });
    it('GET /products returns array', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTrue();
    });
    it('POST /products without token should 401', async () => {
        const res = await request.post('/products').send({ name: 'X', price: 10, category_id: catId });
        expect(res.status).toBe(401);
    });
});
