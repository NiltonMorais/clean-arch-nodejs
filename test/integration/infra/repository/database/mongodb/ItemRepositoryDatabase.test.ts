import Dimension from "../../../../../../src/domain/entity/Dimension";
import Item from "../../../../../../src/domain/entity/Item";
import ItemRepositoryDatabase from "../../../../../../src/infra/repository/database/mongodb/ItemRepositoryDatabase";
import MongoDbConnectionAdapter from "../../../../../../src/infra/database/MongoDbConnectionAdapter";
import ConnectionNoSql from "../../../../../../src/infra/database/ConnectionNoSql";
import ItemRepository from "../../../../../../src/domain/repository/ItemRepository";

let connection: ConnectionNoSql;
let itemRepository: ItemRepository;

beforeEach(async () => {
    connection = new MongoDbConnectionAdapter();
    itemRepository = new ItemRepositoryDatabase(connection);
    await itemRepository.clear();
});

afterEach(async () => {
    await connection.close();
});

test.skip("Deve retornar itens do banco de dados", async function () {
    await itemRepository.save(
        new Item(1, "Guitarra", 30, new Dimension(10, 10, 10), 1)
    );
    await itemRepository.save(
        new Item(2, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    const items = await itemRepository.list();
    expect(items).toHaveLength(2);
    expect(items[0].description).toBe("Guitarra");
    expect(items[1].description).toBe("Cabo");
});

test.skip("Deve salvar um item no banco de dados", async function () {
    await itemRepository.save(
        new Item(3, "Caixa", 30, new Dimension(10, 10, 10), 1)
    );
    const items = await itemRepository.list();
    expect(items).toHaveLength(1);
    expect(items[0].description).toBe("Caixa");
});

test.skip("Deve retornar um item do banco de dados", async function () {
    await itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    const item = await itemRepository.get(1);
    expect(item).toBeInstanceOf(Item);
    expect(item.idItem).toBe(1);
    expect(item.description).toBe("Guitarra");
});
