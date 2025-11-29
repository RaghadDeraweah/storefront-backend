"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const authService_1 = require("../services/authService");
const userModel = new userModel_1.UserModel();
// SIGNUP
const createUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await userModel.create(user);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createUser = createUser;
// LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.authenticate(email, password);
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        const token = (0, authService_1.generateToken)({ userId: user.id });
        res.json({
            message: 'Logged in successfully',
            token
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.loginUser = loginUser;
// GET ALL USERS
const getAllUsers = async (_req, res) => {
    try {
        const users = await userModel.getAll();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllUsers = getAllUsers;
// GET BY ID
const getUserById = async (req, res) => {
    try {
        const idParam = req.params.id;
        const user = await userModel.getById(Number(idParam));
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getUserById = getUserById;
// UPDATE
const updateUser = async (req, res) => {
    try {
        const idParam = req.params.id;
        const updated = await userModel.update(Number(idParam), req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateUser = updateUser;
// DELETE
const deleteUser = async (req, res) => {
    try {
        const idParam = req.params.id;
        await userModel.delete(Number(idParam));
        res.json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteUser = deleteUser;
