import StockOutHandler from "../../application/handler/StockOutHandler";
import OrderPlaced from "../../domain/event/OrderPlaced";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Queue from "../queue/Queue";

export default class StockController {
    constructor(
        readonly queue: Queue,
        readonly repositoryFactory: RepositoryFactory
    ) {
        queue.consume("orderPlaced", async function (msg: any) {
            const stockOutHandler = new StockOutHandler(repositoryFactory);
            const orderPlaced = new OrderPlaced(msg.code, msg.orderItems);
            await stockOutHandler.handle(orderPlaced);
        });
    }
}
