import GetOrder from "../../../src/application/GetOrder";
import ConnectionNoSql from "../../../src/infra/database/ConnectionNoSql";
import OrderRepository from "../../../src/domain/repository/OrderRepository";
import MongoDbConnectionAdapter from "../../../src/infra/database/MongoDbConnectionAdapter";
import ItemRepository from "../../../src/domain/repository/ItemRepository";
import Item from "../../../src/domain/entity/Item";
import Dimension from "../../../src/domain/entity/Dimension";
import PlaceOrder from "../../../src/application/PlaceOrder";
import CouponRepository from "../../../src/domain/repository/CouponRepository";
import Coupon from "../../../src/domain/entity/Coupon";
import RepositoryFactory from "../../../src/domain/factory/RepositoryFactory";
import DatabaseNoSqlRepositoryFactory from "../../../src/infra/factory/DatabaseNoSqlRepositoryFactory";
import Queue from "../../../src/infra/queue/Queue";
import MemoryQueueAdapter from "../../../src/infra/queue/MemoryQueueAdapter";

let connection: ConnectionNoSql;
let orderRepository: OrderRepository;
let itemRepository: ItemRepository;
let couponRepository: CouponRepository;
let repositoryFactory: RepositoryFactory;
let queue: Queue;

beforeEach(async () => {
    connection = new MongoDbConnectionAdapter();
    repositoryFactory = new DatabaseNoSqlRepositoryFactory(connection);
    orderRepository = repositoryFactory.createOrderRepository();
    itemRepository = repositoryFactory.createItemRepository();
    couponRepository = repositoryFactory.createCouponRepository();
    queue = new MemoryQueueAdapter();
    await orderRepository.clear();
    await itemRepository.clear();
    await couponRepository.clear();
});

afterEach(async () => {
    await connection.close();
});

test("Deve obter um pedido pelo código", async function () {
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
    await placeOrder.execute(input);
    const getOrder = new GetOrder(orderRepository);
    const sequencePad = new String(sequence).padStart(8, "0");
    const output = await getOrder.execute("2021" + sequencePad);
    expect(output.code).toBe("2021" + sequencePad);
    expect(output.total).toBe(5132);
});
