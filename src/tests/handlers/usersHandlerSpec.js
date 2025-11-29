"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(app_1.default);
describe('Users Handler', () => {
    const testUser = {
        first_name: 'raghad',
        last_name: 'taq',
        email: 'raghad@gmail.com',
        password: '123123'
    };
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM users;');
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM users;');
    });
    it('POST /users/signup -> signup', async () => {
        const res = await request.post('/users/signup').send(testUser);
        expect(res.status).toBe(201);
        expect(res.body.email).toBe(testUser.email);
    });
    it('POST /users/login -> login and receive token', async () => {
        const res = await request.post('/users/login').send({ email: testUser.email, password: testUser.password });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
