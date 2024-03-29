import axios from "axios";
import PlaceOrder from "../../src/application/PlaceOrder";
import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import ConnectionNoSql from "../../src/infra/database/ConnectionNoSql";
import MongoDbConnectionAdapter from "../../src/infra/database/MongoDbConnectionAdapter";
import DatabaseNoSqlRepositoryFactory from "../../src/infra/factory/DatabaseNoSqlRepositoryFactory";
import MemoryQueueAdapter from "../../src/infra/queue/MemoryQueueAdapter";
import Queue from "../../src/infra/queue/Queue";

let connection: ConnectionNoSql;
let itemRepository: ItemRepository;
let couponRepository: CouponRepository;
let repositoryFactory: RepositoryFactory;
let orderRepository: OrderRepository;
let queue: Queue;

beforeEach(async () => {
    connection = new MongoDbConnectionAdapter();
    repositoryFactory = new DatabaseNoSqlRepositoryFactory(connection);
    itemRepository = repositoryFactory.createItemRepository();
    couponRepository = repositoryFactory.createCouponRepository();
    orderRepository = repositoryFactory.createOrderRepository();
    queue = new MemoryQueueAdapter();
    await orderRepository.clear();
    await itemRepository.clear();
    await couponRepository.clear();
});

afterEach(async () => {
    await connection.close();
});

test.skip("Deve chamar /items", async function () {
    const response = await axios({
        url: "http://localhost:3000/items",
        method: "GET",
    });
    const items = response.data;
    expect(items).toHaveLength(3);
});

test.skip("Deve chamar /orders", async function () {
    await itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    await itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    await itemRepository.save(
        new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    couponRepository.save(
        new Coupon("VALE20", 20, new Date("2021-03-10T10:00:00"))
    );
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
        coupon: "VALE20",
        date: new Date("2021-03-01T10:00:00"),
    };
    await placeOrder.execute(input);
    await placeOrder.execute(input);

    const response = await axios({
        url: "http://localhost:3000/orders",
        method: "GET",
    });
    const orders = response.data;
    expect(orders).toHaveLength(2);
});

test.skip("Deve chamar /orders/:code", async function () {
    await itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    await itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    await itemRepository.save(
        new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    couponRepository.save(
        new Coupon("VALE20", 20, new Date("2021-03-10T10:00:00"))
    );
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
        coupon: "VALE20",
        date: new Date("2021-03-01T10:00:00"),
    };
    await placeOrder.execute(input);

    const response = await axios({
        url: "http://localhost:3000/orders/202100000001",
        method: "GET",
    });
    const order = response.data;
    expect(order.code).toBe("202100000001");
    expect(order.total).toBe(5132);
});
