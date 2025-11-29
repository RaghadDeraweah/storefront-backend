"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const categoriesHandler_1 = require("../handlers/categoriesHandler");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, categoriesHandler_1.createCategory);
router.get('/', categoriesHandler_1.getAllCategories);
router.get('/:id', categoriesHandler_1.getCategoryById);
router.put('/:id', authMiddleware_1.default, categoriesHandler_1.updateCategory);
router.delete('/:id', authMiddleware_1.default, categoriesHandler_1.deleteCategory);
exports.default = router;
