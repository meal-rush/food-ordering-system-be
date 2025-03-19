import { Router } from 'express';
import OrderController from '../controllers/orderController';

const router = Router();
const orderController = new OrderController();

// Define REST API routes
router.post('/', orderController.createOrder.bind(orderController)); // Create order
router.get('/:id', orderController.getOrder.bind(orderController)); // Get order by ID
router.put('/:id', orderController.updateOrder.bind(orderController)); // Update order
router.delete('/:id', orderController.deleteOrder.bind(orderController)); // Delete order

export default router;