"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getActiveOrder = exports.getOrdersByUser = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const orderModel_1 = require("../models/orderModel");
const orderModel = new orderModel_1.OrderModel();
// CREATE ORDER
const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { status } = req.body;
        const newOrder = await orderModel.create({
            status,
            user_id: userId
        });
        res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createOrder = createOrder;
// GET ALL ORDERS
const getAllOrders = async (_req, res) => {
    try {
        const orders = await orderModel.getAll();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllOrders = getAllOrders;
// GET ORDER BY ID
const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.getById(Number(req.params.id));
        if (!order)
            return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getOrderById = getOrderById;
// GET ORDERS BY USER
const getOrdersByUser = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const orders = await orderModel.getByUser(userId);
        res.json(orders);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getOrdersByUser = getOrdersByUser;
// GET ACTIVE ORDER
const getActiveOrder = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const order = await orderModel.getActiveOrder(userId);
        if (!order)
            return res.status(404).json({ message: 'No active order found' });
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getActiveOrder = getActiveOrder;
// UPDATE ORDER STATUS
const updateOrder = async (req, res) => {
    try {
        const updated = await orderModel.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateOrder = updateOrder;
// DELETE ORDER
const deleteOrder = async (req, res) => {
    try {
        await orderModel.delete(Number(req.params.id));
        res.json({ message: 'Order deleted' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteOrder = deleteOrder;
