import FreightCalculator from "../domain/entity/FreightCalculator";
import Order from "../domain/entity/Order";
import StockEntry from "../domain/entity/StockEntry";
import OrderPlaced from "../domain/event/OrderPlaced";
import RepositoryFactory from "../domain/factory/RepositoryFactory";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import StockEntryRepository from "../domain/repository/StockEntryRepository";
import Queue from "../infra/queue/Queue";

export default class PlaceOrder {
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
    couponRepository: CouponRepository;
    stockEntryRepository: StockEntryRepository;

    constructor(
        readonly repositoryFactory: RepositoryFactory,
        readonly queue: Queue
    ) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.stockEntryRepository =
            repositoryFactory.createStockEntryRepository();
    }

    async execute(input: Input): Promise<Output> {
        const sequence = (await this.orderRepository.count()) + 1;
        const order = new Order(input.cpf, input.date, sequence);
        // let freight = 0; // exemplo domain service
        // const freightCalculator = new FreightCalculator(); // exemplo domain service
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.get(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
            // freight += freightCalculator.calculate(item, orderItem.quantity); // exemplo domain service
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.get(input.coupon);
            order.addCoupon(coupon);
        }
        // order.freight = (freight > 0 && freight < 10) ? 10 : freight; // exemplo domain service
        await this.orderRepository.save(order);
        const orderPlaced = new OrderPlaced(order.code.value, order.orderItems);
        await this.queue.publish(orderPlaced);
        const total = order.getTotal();
        return {
            code: order.code.value,
            total: total,
        };
    }
}

type Input = {
    cpf: string;
    orderItems: { idItem: number; quantity: number }[];
    coupon?: string;
    date?: Date;
};

type Output = {
    total: number;
    code: string;
};
