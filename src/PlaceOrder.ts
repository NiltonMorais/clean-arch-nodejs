import Order from "./Order";
import ItemRepository from "./ItemRepository";
import OrderRepository from "./OrderRepository";

export default class PlaceOrder {
    constructor(
        readonly itemRepository: ItemRepository,
        readonly orderRepository: OrderRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const order = new Order(input.cpf);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.get(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        await this.orderRepository.save(order);
        const total = order.getTotal();
        return {
            total: total,
        };
    }
}

type Input = {
    cpf: string;
    orderItems: { idItem: number; quantity: number }[];
    coupon?: string;
};

type Output = {
    total: number;
};
