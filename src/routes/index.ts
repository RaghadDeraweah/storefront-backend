import express from 'express';

// Import routes
import usersRoutes from './usersRoutes';
import categoriesRoutes from './categoriesRoutes';
import productsRoutes from './productsRoutes';
import ordersRoutes from './ordersRoutes';
import orderProductsRoutes from './orderProductsRoutes';

const router = express.Router();

// Register route modules
router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/order-products', orderProductsRoutes);

export default router;
