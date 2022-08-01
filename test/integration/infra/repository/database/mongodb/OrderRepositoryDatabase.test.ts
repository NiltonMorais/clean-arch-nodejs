import Item from "../../../../../../src/domain/entity/Item";
import OrderRepositoryDatabase from "../../../../../../src/infra/repository/database/mongodb/OrderRepositoryDatabase";
import MongoDbConnectionAdapter from "../../../../../../src/infra/database/MongoDbConnectionAdapter";
import Order from "../../../../../../src/domain/entity/Order";
import Coupon from "../../../../../../src/domain/entity/Coupon";

test.skip("Deve salvar uma order no banco de dados", async function () {
    const connection = new MongoDbConnectionAdapter();
    const orderRepository = new OrderRepositoryDatabase(connection);
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));

    await orderRepository.save(order);
    const count = await orderRepository.count();
    expect(count).toBeTruthy();
    connection.close();
});
