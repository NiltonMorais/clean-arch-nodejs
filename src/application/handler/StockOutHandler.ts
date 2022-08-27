import StockEntry from "../../domain/entity/StockEntry";
import OrderPlaced from "../../domain/event/OrderPlaced";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import Handler from "./Handler";

export default class StockOutHandler implements Handler {
    stockEntryRepository: StockEntryRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.stockEntryRepository =
            repositoryFactory.createStockEntryRepository();
    }

    async handle(orderPlaced: OrderPlaced) {
        for (const orderItem of orderPlaced.orderItems) {
            await this.stockEntryRepository.save(
                new StockEntry(orderItem.idItem, "out", orderItem.quantity)
            );
        }
    }
}
