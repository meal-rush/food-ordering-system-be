import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customerName: string;
    items: { name: string; quantity: number; price: number }[];
    totalAmount: number;
    status: string;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    customerName: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);

export class OrderModel {
    id: string;
    customerName: string;
    items: Array<{ itemId: string; quantity: number }>;
    totalAmount: number;
    orderDate: Date;
    status: string;

    constructor(id: string, customerName: string, items: Array<{ itemId: string; quantity: number }>, totalAmount: number, orderDate: Date, status: string) {
        this.id = id;
        this.customerName = customerName;
        this.items = items;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
        this.status = status;
    }

    validate() {
        // Add validation logic here
    }

    transform() {
        // Add transformation logic here
    }
}