export interface Order {
    id: string;
    userId: string;
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
}