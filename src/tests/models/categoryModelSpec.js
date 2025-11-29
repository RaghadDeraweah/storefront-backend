"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = require("../../models/categoryModel");
const database_1 = __importDefault(require("../../database"));
const categoryModel = new categoryModel_1.CategoryModel();
describe('Category Model Tests', () => {
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM categories;');
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
        const id = cats[0].id;
        const cat = await categoryModel.getById(id);
        expect(cat?.name).toBe('Electronics');
        const updated = await categoryModel.update(id, { name: 'Devices' });
        expect(updated.name).toBe('Devices');
        const deleted = await categoryModel.delete(id);
        expect(deleted.name).toBe('Devices');
    });
});
