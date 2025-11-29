import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../handlers/productsHandler';

const router = express.Router();

router.post('/', authMiddleware, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
