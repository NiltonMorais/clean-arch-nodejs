import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemController from "./infra/controller/ItemController";
import MongoDbConnectionAdapter from "./infra/database/MongoDbConnectionAdapter";
import OrderController from "./infra/controller/OrderController";
import StockController from "./infra/controller/StockController";
import DatabaseNoSqlRepositoryFactory from "./infra/factory/DatabaseNoSqlRepositoryFactory";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";

async function start(){
    const queue = new RabbitMQAdapter();
    await queue.connect();
    const connection = new MongoDbConnectionAdapter();
    const repositoryFactory = new DatabaseNoSqlRepositoryFactory(connection);
    const itemRepository = repositoryFactory.createItemRepository()

    const http = new ExpressAdapter();
    new ItemController(http, itemRepository);
    new OrderController(http, repositoryFactory, queue);
    new StockController(queue, repositoryFactory);

    http.listen(3000);
}

start();