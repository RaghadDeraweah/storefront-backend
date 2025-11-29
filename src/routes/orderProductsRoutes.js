"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const orderProductsHandler_1 = require("../handlers/orderProductsHandler");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, orderProductsHandler_1.addProductToOrder);
router.get('/order/:orderId', authMiddleware_1.default, orderProductsHandler_1.getOrderItems);
router.get('/:id', authMiddleware_1.default, orderProductsHandler_1.getOrderProductById);
router.put('/:id', authMiddleware_1.default, orderProductsHandler_1.updateOrderProduct);
router.delete('/:id', authMiddleware_1.default, orderProductsHandler_1.deleteOrderProduct);
exports.default = router;
