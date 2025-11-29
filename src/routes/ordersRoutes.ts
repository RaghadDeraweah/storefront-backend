import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getActiveOrder,
  updateOrder,
  deleteOrder
} from '../handlers/ordersHandler';

const router = express.Router();

// crud
router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getAllOrders);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id', authMiddleware, updateOrder);
router.delete('/:id', authMiddleware, deleteOrder);

// user-specific
router.get('/user/:userId', authMiddleware, getOrdersByUser);
router.get('/user/:userId/active', authMiddleware, getActiveOrder);

export default router;
