"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../../models/productModel");
const categoryModel_1 = require("../../models/categoryModel");
const database_1 = __importDefault(require("../../database"));
const productModel = new productModel_1.ProductModel();
const categoryModel = new categoryModel_1.CategoryModel();
describe('Product Model Tests', () => {
    let catId;
    beforeAll(async () => {
        await database_1.default.query('DELETE FROM order_products;');
        await database_1.default.query('DELETE FROM orders;');
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
        const c = await categoryModel.create({ name: 'TestCat' });
        catId = c.id;
    });
    afterAll(async () => {
        await database_1.default.query('DELETE FROM products;');
        await database_1.default.query('DELETE FROM categories;');
    });
    it('should create a product', async () => {
        const created = await productModel.create({ name: 'Phone', description: 'A phone', price: 1000, category_id: catId });
        expect(created).toBeDefined();
        expect(created.name).toBe('Phone');
        expect(created.id).toBeDefined();
    });
    it('should list products', async () => {
        const products = await productModel.getAll();
        expect(products.length).toBeGreaterThanOrEqual(1);
    });
    it('should get by id, update and delete', async () => {
        const products = await productModel.getAll();
        const id = products[0].id;
        const p = await productModel.getById(id);
        expect(p?.name).toBe('Phone');
        const updated = await productModel.update(id, { name: 'Phone X', price: 500 });
        expect(updated.name).toBe('Phone X');
        const deleted = await productModel.delete(id);
        expect(deleted.name).toBe('Phone X');
    });
});
