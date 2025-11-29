"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductModel {
    async addProduct(item) {
        const result = await database_1.default.query(`
      INSERT INTO order_products (order_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING id, order_id, product_id, quantity
      `, [item.order_id, item.product_id, item.quantity]);
        return result.rows[0];
    }
    async getItemsByOrder(orderId) {
        const result = await database_1.default.query(`
      SELECT id, order_id, product_id, quantity
      FROM order_products
      WHERE order_id=$1
      ORDER BY id
      `, [orderId]);
        return result.rows;
    }
    async getById(id) {
        const result = await database_1.default.query(`
      SELECT id, order_id, product_id, quantity
      FROM order_products
      WHERE id=$1
      `, [id]);
        return result.rows[0] || null;
    }
    async update(id, quantity) {
        const result = await database_1.default.query(`
      UPDATE order_products
      SET quantity=$1
      WHERE id=$2
      RETURNING id, order_id, product_id, quantity
      `, [quantity, id]);
        return result.rows[0];
    }
    async delete(id) {
        const result = await database_1.default.query(`
      DELETE FROM order_products
      WHERE id=$1
      RETURNING id, order_id, product_id, quantity
      `, [id]);
        return result.rows[0];
    }
}
exports.OrderProductModel = OrderProductModel;
