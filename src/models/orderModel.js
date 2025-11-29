"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    async create(order) {
        const result = await database_1.default.query(`
      INSERT INTO orders (user_id, status)
      VALUES ($1, $2)
      RETURNING id, user_id, status
      `, [order.user_id, order.status ?? 'active']);
        return result.rows[0];
    }
    async getAll() {
        const result = await database_1.default.query(`
      SELECT id, user_id, status
      FROM orders
      ORDER BY id
    `);
        return result.rows;
    }
    async getById(id) {
        const result = await database_1.default.query(`
      SELECT id, user_id, status
      FROM orders
      WHERE id=$1
      `, [id]);
        return result.rows[0] || null;
    }
    async getByUser(userId) {
        const result = await database_1.default.query(`
      SELECT id, user_id, status
      FROM orders
      WHERE user_id=$1
      ORDER BY id
      `, [userId]);
        return result.rows;
    }
    async getActiveOrder(userId) {
        const result = await database_1.default.query(`
      SELECT id, user_id, status
      FROM orders
      WHERE user_id=$1 AND status='active'
      LIMIT 1
      `, [userId]);
        return result.rows[0] || null;
    }
    async update(id, data) {
        const result = await database_1.default.query(`
      UPDATE orders
      SET status=$1
      WHERE id=$2
      RETURNING id, user_id, status
      `, [data.status, id]);
        return result.rows[0];
    }
    async delete(id) {
        const result = await database_1.default.query(`
      DELETE FROM orders
      WHERE id=$1
      RETURNING id, user_id, status
      `, [id]);
        return result.rows[0];
    }
}
exports.OrderModel = OrderModel;
