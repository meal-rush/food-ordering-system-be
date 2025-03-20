import { Request, Response } from 'express';
import { Order, IOrder } from '../models/orderModel';
import logger from '../utils/logger';

class OrderController {
    // Create a new order
    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { customerName, items } = req.body;

            // Calculate total amount
            const totalAmount = items.reduce((sum: number, item: { quantity: number; price: number }) => {
                return sum + item.quantity * item.price;
            }, 0);

            const newOrder: IOrder = new Order({
                customerName,
                items,
                totalAmount,
            });

            // Save the order to the database
            const savedOrder = await newOrder.save();
            logger.info(`Order created: ${savedOrder._id}`);
            res.status(201).json(savedOrder);
        } catch (error) {
            logger.error(`Failed to create order: ${(error as Error).message}`);
            res.status(500).json({ message: 'Failed to create order', error });
        }
    }

    // Get an order by ID
    async getOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await Order.findById(id);
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }

            logger.info(`Order retrieved: ${order._id}`);
            res.status(200).json(order);
        } catch (error) {
            logger.error(`Failed to retrieve order: ${(error as Error).message}`);
            res.status(500).json({ message: 'Failed to retrieve order', error });
        }
    }

    // Update an order by ID
    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedOrder) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }

            logger.info(`Order updated: ${updatedOrder._id}`);
            res.status(200).json(updatedOrder);
        } catch (error) {
            logger.error(`Failed to update order: ${(error as Error).message}`);
            res.status(500).json({ message: 'Failed to update order', error });
        }
    }

    // Delete an order by ID
    async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const deletedOrder = await Order.findByIdAndDelete(id);
            if (!deletedOrder) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }

            logger.info(`Order deleted: ${deletedOrder._id}`);
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            logger.error(`Failed to delete order: ${(error as Error).message}`);
            res.status(500).json({ message: 'Failed to delete order', error });
        }
    }
}

export default OrderController;