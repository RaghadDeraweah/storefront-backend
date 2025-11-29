"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import routes
const usersRoutes_1 = __importDefault(require("./usersRoutes"));
const categoriesRoutes_1 = __importDefault(require("./categoriesRoutes"));
const productsRoutes_1 = __importDefault(require("./productsRoutes"));
const ordersRoutes_1 = __importDefault(require("./ordersRoutes"));
const orderProductsRoutes_1 = __importDefault(require("./orderProductsRoutes"));
const router = express_1.default.Router();
// Register route modules
router.use('/users', usersRoutes_1.default);
router.use('/categories', categoriesRoutes_1.default);
router.use('/products', productsRoutes_1.default);
router.use('/orders', ordersRoutes_1.default);
router.use('/order-products', orderProductsRoutes_1.default);
exports.default = router;
