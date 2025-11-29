import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';

import {
  addProductToOrder,
  getOrderItems,
  getOrderProductById,
  updateOrderProduct,
  deleteOrderProduct
} from '../handlers/orderProductsHandler';

const router = express.Router();


router.post('/', authMiddleware, addProductToOrder);
router.get('/order/:orderId', authMiddleware, getOrderItems);
router.get('/:id', authMiddleware, getOrderProductById);
router.put('/:id', authMiddleware, updateOrderProduct);
router.delete('/:id', authMiddleware, deleteOrderProduct);

export default router;
