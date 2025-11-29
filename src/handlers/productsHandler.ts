import { Request, Response } from 'express';
import { ProductModel, Product } from '../models/productModel';

const productModel = new ProductModel();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const newProduct = await productModel.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productModel.getById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await productModel.update(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productModel.delete(Number(req.params.id));
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
