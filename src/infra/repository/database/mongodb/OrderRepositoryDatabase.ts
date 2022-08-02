import Order from "../../../../domain/entity/Order";
import OrderCoupon from "../../../../domain/entity/OrderCoupon";
import OrderItem from "../../../../domain/entity/OrderItem";
import OrderRepository from "../../../../domain/repository/OrderRepository";
import ConnectionNoSql from "../../../database/ConnectionNoSql";

export default class OrderRepositoryDatabase implements OrderRepository {
    readonly collection: string = "orders";

    constructor(readonly db: ConnectionNoSql) {
    }

    async save(order: Order): Promise<void> {
        return await this.db.insertOne(this.collection, order);
    }

    async count(): Promise<number> {
        return await this.db.count(this.collection);
    }

    async list(): Promise<Order[]> {
        const orders: Order[] = [];
        const ordersData = await this.db.list(this.collection);
        for (const orderData of ordersData) {
            const order = await this.getByCode(orderData.code.value);
            orders.push(order);
        }
        return orders;
    }

    async getByCode(code: string): Promise<Order> {
        const filter = { code: { value: code } };
        const orderData = await this.db.findOne(this.collection, filter);
        if (!orderData) {
            throw new Error("Order not found");
        }
        const order = new Order(
            orderData.cpf.value,
            orderData.date,
            orderData.sequence
        );
        order.orderItems = orderData.orderItems.map((orderItemData: any) => new OrderItem(orderItemData.idItem, orderItemData.price, orderItemData.quantity));
        order.freight.total = orderData.freight.total;
        if (orderData.coupon) {
            order.coupon = new OrderCoupon(
                orderData.coupon.code,
                orderData.coupon.percentage
            );
        }
        return order;
    }

    async clear(): Promise<void> {
        await this.db.clear(this.collection);
    }
}