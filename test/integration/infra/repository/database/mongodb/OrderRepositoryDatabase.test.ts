import Item from "../../../../../../src/domain/entity/Item";
import OrderRepositoryDatabase from "../../../../../../src/infra/repository/database/mongodb/OrderRepositoryDatabase";
import MongoDbConnectionAdapter from "../../../../../../src/infra/database/MongoDbConnectionAdapter";
import Order from "../../../../../../src/domain/entity/Order";
import Coupon from "../../../../../../src/domain/entity/Coupon";
import ConnectionNoSql from "../../../../../../src/infra/database/ConnectionNoSql";
import OrderRepository from "../../../../../../src/domain/repository/OrderRepository";

let connection: ConnectionNoSql;
let orderRepository: OrderRepository;

beforeEach(async () => {
    connection = new MongoDbConnectionAdapter();
    orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clear();
});

afterEach(async () => {
    await connection.close();
});

test.skip("Deve salvar uma order no banco de dados", async function () {
    const countBefore = await orderRepository.count();
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));
    await orderRepository.save(order);
    const countAfter = await orderRepository.count();
    expect(countBefore).toBe(0);
    expect(countAfter).toBe(1);
});

test("Deve retornar todas as orders do banco de dados", async function () {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));
    await orderRepository.save(order);
    const orders = await orderRepository.list();
    expect(orders).toHaveLength(1);
});

test.skip("Deve buscar uma order pelo código", async function () {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));
    await orderRepository.save(order);
    const orderPersisted = await orderRepository.getByCode(order.code.value);
    expect(orderPersisted).toBeInstanceOf(Order);
    expect(orderPersisted.code.value).toBe(order.code.value);
    //expect(orderPersisted.getTotal()).toBe(order.getTotal());
});
