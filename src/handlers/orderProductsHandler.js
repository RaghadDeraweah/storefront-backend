"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderProduct = exports.updateOrderProduct = exports.getOrderProductById = exports.getOrderItems = exports.addProductToOrder = void 0;
const orderProductModel_1 = require("../models/orderProductModel");
const orderProductModel = new orderProductModel_1.OrderProductModel();
// ADD PRODUCT TO ORDER
const addProductToOrder = async (req, res) => {
    try {
        const item = req.body;
        const created = await orderProductModel.addProduct(item);
        res.status(201).json(created);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.addProductToOrder = addProductToOrder;
// GET ITEMS OF ORDER
const getOrderItems = async (req, res) => {
    try {
        const orderId = Number(req.params.orderId);
        const items = await orderProductModel.getItemsByOrder(orderId);
        res.json(items);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getOrderItems = getOrderItems;
// GET SINGLE ORDER ITEM
const getOrderProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const item = await orderProductModel.getById(id);
        if (!item)
            return res.status(404).json({ message: 'Order item not found' });
        res.json(item);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getOrderProductById = getOrderProductById;
// UPDATE QUANTITY
const updateOrderProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { quantity } = req.body;
        const updated = await orderProductModel.update(id, quantity);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateOrderProduct = updateOrderProduct;
// DELETE ORDER ITEM
const deleteOrderProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await orderProductModel.delete(id);
        res.json({ message: 'Order item deleted' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteOrderProduct = deleteOrderProduct;
