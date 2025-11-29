import { Request, Response } from 'express';
import { CategoryModel, Category } from '../models/categoryModel';

const categoryModel = new CategoryModel();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category: Category = req.body;
    const newCategory = await categoryModel.create(category);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryModel.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryModel.getById(Number(req.params.id));
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updated = await categoryModel.update(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categoryModel.delete(Number(req.params.id));
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
