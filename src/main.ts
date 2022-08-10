import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemRepositoryDatabase from "./infra/repository/database/mongodb/ItemRepositoryDatabase";
import ItemController from "./infra/controller/ItemController";
import MongoDbConnectionAdapter from "./infra/database/MongoDbConnectionAdapter";
import OrderRepositoryDatabase from "./infra/repository/database/mongodb/OrderRepositoryDatabase";
import OrderController from "./infra/controller/OrderController";

const connection = new MongoDbConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);

const http = new ExpressAdapter();
new ItemController(http, itemRepository);
new OrderController(http, orderRepository);

http.listen(3000);
