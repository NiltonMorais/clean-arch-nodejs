import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import CouponRepositoryMemory from "../repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {
    itemRepository?: ItemRepository;
    orderRepository?: OrderRepository;
    couponRepository?: CouponRepository;

    createItemRepository(): ItemRepository {
        if (!this.itemRepository) {
            this.itemRepository = new ItemRepositoryMemory();
        }
        return this.itemRepository;
    }

    createOrderRepository(): OrderRepository {
        if (!this.orderRepository) {
            this.orderRepository = new OrderRepositoryMemory();
        }
        return this.orderRepository;
    }

    createCouponRepository(): CouponRepository {
        if (!this.couponRepository) {
            this.couponRepository = new CouponRepositoryMemory();
        }
        return this.couponRepository;
    }
}
