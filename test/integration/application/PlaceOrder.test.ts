import PlaceOrder from "../../../src/application/PlaceOrder";
import Dimension from "../../../src/domain/entity/Dimension";
import Item from "../../../src/domain/entity/Item";
import Coupon from "../../../src/domain/entity/Coupon";
import MemoryRepositoryFactory from "../../../src/infra/factory/MemoryRepositoryFactory";
import GetStock from '../../../src/application/GetStock';
import OrderRepository from "../../../src/domain/repository/OrderRepository";
import ItemRepository from "../../../src/domain/repository/ItemRepository";
import CouponRepository from "../../../src/domain/repository/CouponRepository";
import StockEntryRepository from "../../../src/domain/repository/StockEntryRepository";
import Queue from "../../../src/infra/queue/Queue";
import MemoryQueueAdapter from '../../../src/infra/queue/MemoryQueueAdapter';
import StockController from '../../../src/infra/controller/StockController';

const repositoryFactory = new MemoryRepositoryFactory();
let orderRepository: OrderRepository;
let itemRepository: ItemRepository;
let couponRepository: CouponRepository;
let stockEntryRepository: StockEntryRepository;
let queue: Queue;

beforeEach(async () => {
    orderRepository = repositoryFactory.createOrderRepository();
    itemRepository = repositoryFactory.createItemRepository();
    couponRepository = repositoryFactory.createCouponRepository();
    stockEntryRepository = repositoryFactory.createStockEntryRepository();
    queue = new MemoryQueueAdapter();
    await orderRepository.clear();
    await itemRepository.clear();
    await couponRepository.clear();
    await stockEntryRepository.clear();
});

test("Deve fazer um pedido", async function () {
    itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
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
    itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
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
    itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
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
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5132);
});

test("Deve fazer um pedido e lançar no estoque", async function () {
    new StockController(queue, repositoryFactory);
    itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
    const placeOrder = new PlaceOrder(repositoryFactory, queue);
    const input = {
        cpf: "935.411.347-80",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ],
    };
    await placeOrder.execute(input);
    const getStock = new GetStock(repositoryFactory);
    const output = await getStock.execute(3);
    expect(output.total).toBe(-3);
});