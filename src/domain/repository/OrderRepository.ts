import Order from "../entity/Order";

export default interface OrderRepository {
    count(): Promise<number>;
    save(order: Order): Promise<void>;
}
