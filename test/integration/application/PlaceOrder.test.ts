import PlaceOrder from "../../../src/application/PlaceOrder";
import Dimension from "../../../src/domain/entity/Dimension";
import Item from "../../../src/domain/entity/Item";
import Coupon from "../../../src/domain/entity/Coupon";
import MemoryRepositoryFactory from "../../../src/infra/factory/MemoryRepositoryFactory";
import GetStock from "../../../src/application/GetStock";
import OrderRepository from "../../../src/domain/repository/OrderRepository";
import ItemRepository from "../../../src/domain/repository/ItemRepository";
import CouponRepository from "../../../src/domain/repository/CouponRepository";
import StockEntryRepository from "../../../src/domain/repository/StockEntryRepository";
import Queue from "../../../src/infra/queue/Queue";
import MemoryQueueAdapter from "../../../src/infra/queue/MemoryQueueAdapter";
import StockController from "../../../src/infra/controller/StockController";
import RabbitMQAdapter from "../../../src/infra/queue/RabbitMQAdapter";
import DatabaseNoSqlRepositoryFactory from "../../../src/infra/factory/DatabaseNoSqlRepositoryFactory";
import MongoDbConnectionAdapter from "../../../src/infra/database/MongoDbConnectionAdapter";
import RepositoryFactory from "../../../src/domain/factory/RepositoryFactory";
import ConnectionNoSql from "../../../src/infra/database/ConnectionNoSql";

let connection: ConnectionNoSql;
let repositoryFactory: RepositoryFactory;
let orderRepository: OrderRepository;
let itemRepository: ItemRepository;
let couponRepository: CouponRepository;
let stockEntryRepository: StockEntryRepository;
let queue: Queue;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

beforeEach(async () => {
    connection = new MongoDbConnectionAdapter();
    repositoryFactory = new DatabaseNoSqlRepositoryFactory(connection);
    // const repositoryFactory = new MemoryRepositoryFactory();
    orderRepository = repositoryFactory.createOrderRepository();
    itemRepository = repositoryFactory.createItemRepository();
    couponRepository = repositoryFactory.createCouponRepository();
    stockEntryRepository = repositoryFactory.createStockEntryRepository();
    //queue = new MemoryQueueAdapter();
    queue = new RabbitMQAdapter();
    await queue.connect();
    await orderRepository.clear();
    await itemRepository.clear();
    await couponRepository.clear();
    await stockEntryRepository.clear();
});

afterEach(async () => {
    await sleep(200);
    await queue.close();
    await connection.close();
});

test("Deve fazer um pedido", async function () {
    await itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    await itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    await itemRepository.save(
        new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6350);
});

test("Deve fazer um pedido e gerar o código do pedido", async function () {
    const sequence = (await orderRepository.count()) + 1;
    await itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    await itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    await itemRepository.save(
        new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
        date: new Date("2021-03-01T10:00:00"),
    };
    const output = await placeOrder.execute(input);
    const sequencePad = new String(sequence).padStart(8, "0");
    expect(output.code).toBe("2021" + sequencePad);
});

test("Deve fazer um pedido com desconto", async function () {
    await itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    await itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    await itemRepository.save(
        new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    await couponRepository.save(
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
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5132);
});

test("Deve fazer um pedido e lançar no estoque", async function () {
    new StockController(queue, repositoryFactory);
    await itemRepository.save(
        new Item(5, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    await itemRepository.save(
        new Item(6, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    await itemRepository.save(
        new Item(7, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 1 },
            { idItem: 7, quantity: 3 },
        ],
    };
    await placeOrder.execute(input);
    await sleep(200);
    const getStock = new GetStock(repositoryFactory);
    const output = await getStock.execute(7);
    expect(output.total).toBe(-3);
});
