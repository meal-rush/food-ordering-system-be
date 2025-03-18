import { Router, Application } from 'express';
import OrderController from '../controllers/orderController';

const router = Router();
const orderController = new OrderController();

export function setOrderRoutes(app: Application) {
    app.use('/api/orders', router);
    router.post('/', orderController.createOrder.bind(orderController));
    router.get('/:id', orderController.getOrder.bind(orderController));
    router.put('/:id', orderController.updateOrder.bind(orderController));
    router.delete('/:id', orderController.deleteOrder.bind(orderController));
}