"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(app_1.default);
describe('Categories Handler', () => {
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM categories;');
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM categories;');
    });
    it('POST /categories (protected) should fail without token', async () => {
        const res = await request.post('/categories').send({ name: 'Electro' });
        expect(res.status).toBe(401);
    });
    it('GET /categories should return array', async () => {
        const res = await request.get('/categories');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTrue();
    });
});
