"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, NODE_ENV } = process.env;
const client = new pg_1.Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: NODE_ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports.default = client;
