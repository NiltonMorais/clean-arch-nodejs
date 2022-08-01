import Dimension from "../../../../../../src/domain/entity/Dimension";
import Item from "../../../../../../src/domain/entity/Item";
import ItemRepositoryDatabase from "../../../../../../src/infra/repository/database/mongodb/ItemRepositoryDatabase";
import MongoDbConnectionAdapter from "../../../../../../src/infra/database/MongoDbConnectionAdapter";

test.skip("Deve retornar itens do banco de dados", async function () {
    const connection = new MongoDbConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    await itemRepository.save(
        new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    const items = await itemRepository.list();
    expect(items).toBeTruthy();
    connection.close();
});

test.skip("Deve salvar um item no banco de dados", async function () {
    const connection = new MongoDbConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    await itemRepository.save(
        new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    );
    const items = await itemRepository.list();
    expect(items).toBeTruthy();
    connection.close();
});

test.skip("Deve retornar um item do banco de dados", async function () {
    const connection = new MongoDbConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    await itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    const item = await itemRepository.get(1);
    expect(item).toBeInstanceOf(Item);
    expect(item.idItem).toBe(1);
    expect(item.description).toBe("Guitarra");
    connection.close();
});
