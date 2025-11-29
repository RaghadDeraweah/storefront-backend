/*import express from 'express';
import { UserStore } from '../models/userModel';
import { generateToken } from '../services/authService';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
const store = new UserStore();

// POST /api/users  -> create user
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'first_name, last_name, email and password are required' });
    }
    const user = await store.create({ first_name, last_name, email, password });
    const token = generateToken({ userId: user.id, email: user.email });
    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
});

// POST /api/users/login -> login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const user = await store.authenticate(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ userId: user.id, email: user.email });
    return res.json({ user, token });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

// GET /api/users -> list users (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await store.index();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

// GET /api/users/:id -> show user (protected)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await store.show(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
*/
import type { Request, Response } from 'express';
import { UserModel, type User } from '../models/userModel';
import { generateToken } from '../services/authService';

const userModel = new UserModel();

// SIGNUP
export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = await userModel.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.authenticate(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ userId: user.id });

    res.json({
      message: 'Logged in successfully',
      token
    });

  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET ALL USERS
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET BY ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const user = await userModel.getById(Number(idParam));

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const updated = await userModel.update(Number(idParam), req.body);

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    await userModel.delete(Number(idParam));

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
