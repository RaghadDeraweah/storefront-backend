"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersHandler_1 = require("../handlers/usersHandler");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/signup', usersHandler_1.createUser);
router.post('/login', usersHandler_1.loginUser);
router.get('/', authMiddleware_1.default, usersHandler_1.getAllUsers);
router.get('/:id', authMiddleware_1.default, usersHandler_1.getUserById);
router.put('/:id', authMiddleware_1.default, usersHandler_1.updateUser);
router.delete('/:id', authMiddleware_1.default, usersHandler_1.deleteUser);
exports.default = router;
