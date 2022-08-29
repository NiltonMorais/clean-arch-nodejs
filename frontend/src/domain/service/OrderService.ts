import Order from "../entity/Order";

export default interface OrderService {
    save(order: Order): Promise<{code: string, total: number}>;
}