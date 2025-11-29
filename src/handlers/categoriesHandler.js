"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const categoryModel_1 = require("../models/categoryModel");
const categoryModel = new categoryModel_1.CategoryModel();
const createCategory = async (req, res) => {
    try {
        const category = req.body;
        const newCategory = await categoryModel.create(category);
        res.status(201).json(newCategory);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (_req, res) => {
    try {
        const categories = await categoryModel.getAll();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const category = await categoryModel.getById(Number(req.params.id));
        if (!category)
            return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res) => {
    try {
        const updated = await categoryModel.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        await categoryModel.delete(Number(req.params.id));
        res.json({ message: 'Category deleted' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteCategory = deleteCategory;
