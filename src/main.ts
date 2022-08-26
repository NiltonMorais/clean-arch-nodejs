import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemRepositoryDatabase from "./infra/repository/database/mongodb/ItemRepositoryDatabase";
import ItemController from "./infra/controller/ItemController";
import MongoDbConnectionAdapter from "./infra/database/MongoDbConnectionAdapter";
import OrderRepositoryDatabase from "./infra/repository/database/mongodb/OrderRepositoryDatabase";
import OrderController from "./infra/controller/OrderController";
import MemoryQueueAdapter from "./infra/queue/MemoryQueueAdapter";
import StockController from "./infra/controller/StockController";
import MemoryRepositoryFactory from "./infra/factory/MemoryRepositoryFactory";

const queue = new MemoryQueueAdapter();
const connection = new MongoDbConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);
const repositoryFactory = new MemoryRepositoryFactory();

const http = new ExpressAdapter();
new ItemController(http, itemRepository);
new OrderController(http, orderRepository);
new StockController(queue, repositoryFactory);

http.listen(3000);
