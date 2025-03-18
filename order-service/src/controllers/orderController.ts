import { Request, Response } from 'express';
import { Order, IOrder } from '../models/orderModel';

class OrderController {
    async createOrder(req: Request, res: Response) {
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
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create order', error });
        }
    }

    async getOrder(req: Request, res: Response) {
        // Logic for fetching an order by ID
    }

    async updateOrder(req: Request, res: Response) {
        // Logic for updating an order
    }

    async deleteOrder(req: Request, res: Response) {
        // Logic for deleting an order
    }
}

export default OrderController;