import GetOrders from "../../../src/application/GetOrders";
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

let connection: ConnectionNoSql;
let orderRepository: OrderRepository;
let itemRepository: ItemRepository;
let couponRepository: CouponRepository;
let repositoryFactory: RepositoryFactory;

beforeEach(async () => {
    connection = new MongoDbConnectionAdapter();
    repositoryFactory = new DatabaseNoSqlRepositoryFactory(connection);
    orderRepository = repositoryFactory.createOrderRepository();
    itemRepository = repositoryFactory.createItemRepository();
    couponRepository = repositoryFactory.createCouponRepository();
    await orderRepository.clear();
    await itemRepository.clear();
});

afterEach(async () => {
    await connection.close();
});

test("Deve obter uma lista vazia de pedidos", async function () {
    const getOrders = new GetOrders(orderRepository);
    const output = await getOrders.execute();
    expect(output).toHaveLength(0);
});

test("Deve obter os pedidos cadastrados", async function () {
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
    const placeOrder = new PlaceOrder(repositoryFactory);
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
    const getOrders = new GetOrders(orderRepository);
    const output = await getOrders.execute();
    expect(output).toHaveLength(2);
    const [order1, order2] = output;
    expect(order1.code).toBe("202100000001");
    expect(order1.total).toBe(5132);
    expect(order2.code).toBe("202100000002");
    expect(order2.total).toBe(5132);
});
