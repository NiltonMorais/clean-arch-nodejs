import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import CouponRepositoryMemory from "../repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";
import StockEntryRepositoryMemory from "../repository/memory/StockEntryRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {

    itemRepository?: ItemRepository;
    orderRepository?: OrderRepository;
    couponRepository?: CouponRepository;
    stockEntryRepository?: StockEntryRepository;

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

    createStockEntryRepository(): StockEntryRepository {
        if (!this.stockEntryRepository) {
            this.stockEntryRepository = new StockEntryRepositoryMemory();
        }
        return this.stockEntryRepository;
    }
}
