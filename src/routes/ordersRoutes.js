"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const ordersHandler_1 = require("../handlers/ordersHandler");
const router = express_1.default.Router();
// crud
router.post('/', authMiddleware_1.default, ordersHandler_1.createOrder);
router.get('/', authMiddleware_1.default, ordersHandler_1.getAllOrders);
router.get('/:id', authMiddleware_1.default, ordersHandler_1.getOrderById);
router.put('/:id', authMiddleware_1.default, ordersHandler_1.updateOrder);
router.delete('/:id', authMiddleware_1.default, ordersHandler_1.deleteOrder);
// user-specific
router.get('/user/:userId', authMiddleware_1.default, ordersHandler_1.getOrdersByUser);
router.get('/user/:userId/active', authMiddleware_1.default, ordersHandler_1.getActiveOrder);
exports.default = router;
