"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
async function hashPassword(password) {
    const hashed = await bcrypt_1.default.hash(password + pepper, saltRounds);
    return hashed;
}
async function comparePassword(password, hash) {
    return bcrypt_1.default.compare(password + pepper, hash);
}
