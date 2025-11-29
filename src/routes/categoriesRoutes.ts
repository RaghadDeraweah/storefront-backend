import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../handlers/categoriesHandler';

const router = express.Router();

router.post('/', authMiddleware, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;
