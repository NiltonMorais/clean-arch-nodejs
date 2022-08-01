import Order from "../../../../domain/entity/Order";
import OrderRepository from "../../../../domain/repository/OrderRepository";
import ConnectionNoSql from "../../../database/ConnectionNoSql";

export default class OrderRepositoryDatabase implements OrderRepository {
    constructor(readonly db: ConnectionNoSql) {
        this.db.setCollection("orders");
    }

    async save(order: Order): Promise<void> {
        return await this.db.insertOne(order);
    }

    async count(): Promise<number> {
        return await this.db.count();
    }
}
