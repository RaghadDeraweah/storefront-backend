import express from 'express';
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../handlers/usersHandler';

import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
