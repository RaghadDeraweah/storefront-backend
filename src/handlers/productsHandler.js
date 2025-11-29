"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = require("../models/productModel");
const productModel = new productModel_1.ProductModel();
const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productModel.create(product);
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (_req, res) => {
    try {
        const products = await productModel.getAll();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const product = await productModel.getById(Number(req.params.id));
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
    try {
        const updated = await productModel.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        await productModel.delete(Number(req.params.id));
        res.json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteProduct = deleteProduct;
