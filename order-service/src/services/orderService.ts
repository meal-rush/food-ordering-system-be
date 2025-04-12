export class OrderService {
    private orders: any[] = [];

    public placeOrder(order: any): any {
        this.orders.push(order);
        return order;
    }

    public fetchOrder(orderId: string): any | undefined {
        return this.orders.find(order => order.id === orderId);
    }

    public modifyOrder(orderId: string, updatedOrder: any): any | undefined {
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
            this.orders[index] = { ...this.orders[index], ...updatedOrder };
            return this.orders[index];
        }
        return undefined;
    }

    public removeOrder(orderId: string): boolean {
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
            this.orders.splice(index, 1);
            return true;
        }
        return false;
    }
}