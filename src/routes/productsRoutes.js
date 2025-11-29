"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const productsHandler_1 = require("../handlers/productsHandler");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, productsHandler_1.createProduct);
router.get('/', productsHandler_1.getAllProducts);
router.get('/:id', productsHandler_1.getProductById);
router.put('/:id', authMiddleware_1.default, productsHandler_1.updateProduct);
router.delete('/:id', authMiddleware_1.default, productsHandler_1.deleteProduct);
exports.default = router;
