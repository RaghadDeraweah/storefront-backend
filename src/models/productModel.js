"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    async create(product) {
        const result = await database_1.default.query(`
      INSERT INTO products (name, description, price, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, description, price, category_id
      `, [product.name, product.description, product.price, product.category_id]);
        return result.rows[0];
    }
    async getAll() {
        const result = await database_1.default.query(`
      SELECT id, name, description, price, category_id
      FROM products
      ORDER BY id
    `);
        return result.rows;
    }
    async getById(id) {
        const result = await database_1.default.query(`
      SELECT id, name, description, price, category_id
      FROM products
      WHERE id=$1
      `, [id]);
        return result.rows[0] || null;
    }
    async update(id, data) {
        const result = await database_1.default.query(`
      UPDATE products
      SET name=$1, description=$2, price=$3, category_id=$4
      WHERE id=$5
      RETURNING id, name, description, price, category_id
      `, [data.name, data.description, data.price, data.category_id, id]);
        return result.rows[0];
    }
    async delete(id) {
        const result = await database_1.default.query(`
      DELETE FROM products
      WHERE id=$1
      RETURNING id, name, description, price, category_id
      `, [id]);
        return result.rows[0];
    }
}
exports.ProductModel = ProductModel;
