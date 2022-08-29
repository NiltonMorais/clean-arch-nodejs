import Order from "../../domain/entity/Order";
import OrderService from "../../domain/service/OrderService";

export default class OrderServiceMemory implements OrderService {

    orders: Order[] = [];

    async save(order: Order): Promise<{code: string, total: number}>
    {
        order.code = `20210000000${this.orders.length+1}`;
        await this.orders.push(order);
        return {
            code: order.code,
            total: order.total
        }
    }
}