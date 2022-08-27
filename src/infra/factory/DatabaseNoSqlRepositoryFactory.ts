import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import ItemRepositoryDatabase from "../repository/database/mongodb/ItemRepositoryDatabase";
import ConnectionNoSql from "../database/ConnectionNoSql";
import OrderRepositoryDatabase from "../repository/database/mongodb/OrderRepositoryDatabase";
import CouponRepositoryDatabase from "../repository/database/mongodb/CouponRepositoryDatabase";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import StockEntryRepositoryDatabase from "../repository/database/mongodb/StockEntryRepositoryDatabase";

export default class DatabaseNoSqlRepositoryFactory
    implements RepositoryFactory
{
    constructor(readonly connection: ConnectionNoSql) {}

    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(this.connection);
    }

    createOrderRepository(): OrderRepository {
        return new OrderRepositoryDatabase(this.connection);
    }

    createCouponRepository(): CouponRepository {
        return new CouponRepositoryDatabase(this.connection);
    }

    createStockEntryRepository(): StockEntryRepository {
        return new StockEntryRepositoryDatabase(this.connection);
    }
}
