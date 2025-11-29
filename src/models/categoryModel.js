"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const database_1 = __importDefault(require("../database"));
class CategoryModel {
    async create(category) {
        const result = await database_1.default.query(`INSERT INTO categories (name)
       VALUES ($1)
       RETURNING id, name`, [category.name]);
        return result.rows[0];
    }
    async getAll() {
        const result = await database_1.default.query(`SELECT id, name FROM categories ORDER BY id`);
        return result.rows;
    }
    async getById(id) {
        const result = await database_1.default.query(`SELECT id, name FROM categories WHERE id=$1`, [id]);
        return result.rows[0] || null;
    }
    async update(id, data) {
        const result = await database_1.default.query(`
      UPDATE categories
      SET name=$1
      WHERE id=$2
      RETURNING id, name
      `, [data.name, id]);
        return result.rows[0];
    }
    async delete(id) {
        const result = await database_1.default.query(`
      DELETE FROM categories
      WHERE id=$1
      RETURNING id, name
      `, [id]);
        return result.rows[0];
    }
}
exports.CategoryModel = CategoryModel;
