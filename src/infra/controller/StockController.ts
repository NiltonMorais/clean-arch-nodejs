import StockHandler from "../../application/handler/StockHandler";
import OrderPlaced from "../../domain/event/OrderPlaced";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Queue from "../queue/Queue";

export default class StockController {
    constructor(readonly queue: Queue, readonly repositoryFactory: RepositoryFactory){
        queue.consume("orderPlaced", async function(orderPlaced: OrderPlaced) {
            const stockHandler = new StockHandler(repositoryFactory);
            stockHandler.handle(orderPlaced);
        });
    }
}