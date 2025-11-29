import { Request, Response } from 'express';
import {
  OrderProductModel,
  OrderProduct
} from '../models/orderProductModel';

const orderProductModel = new OrderProductModel();

// ADD PRODUCT TO ORDER
export const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const item: OrderProduct = req.body;
    const created = await orderProductModel.addProduct(item);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// GET ITEMS OF ORDER
export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    const items = await orderProductModel.getItemsByOrder(orderId);
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// GET SINGLE ORDER ITEM
export const getOrderProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const item = await orderProductModel.getById(id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// UPDATE QUANTITY
export const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { quantity } = req.body;

    const updated = await orderProductModel.update(id, quantity);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// DELETE ORDER ITEM
export const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await orderProductModel.delete(id);
    res.json({ message: 'Order item deleted' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
