import Order from "../entity/Order";

export default interface OrderRepository {
    count(): Promise<number>;
    save(order: Order): Promise<void>;
    list(): Promise<Order[]>;
    getByCode(code: string): Promise<Order>;
    clear(): Promise<void>;
}
