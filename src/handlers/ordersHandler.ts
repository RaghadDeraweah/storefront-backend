import { Request, Response } from 'express';
import { OrderModel, Order } from '../models/orderModel';

const orderModel = new OrderModel();

// CREATE ORDER
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; 
    const { status } = req.body;

    const newOrder = await orderModel.create({
      status,
      user_id: userId
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};


// GET ALL ORDERS
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.getAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET ORDER BY ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.getById(Number(req.params.id));
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// GET ORDERS BY USER
export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orders = await orderModel.getByUser(userId);
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// GET ACTIVE ORDER
export const getActiveOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const order = await orderModel.getActiveOrder(userId);

    if (!order) return res.status(404).json({ message: 'No active order found' });

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// UPDATE ORDER STATUS
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updated = await orderModel.update(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// DELETE ORDER
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await orderModel.delete(Number(req.params.id));
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
