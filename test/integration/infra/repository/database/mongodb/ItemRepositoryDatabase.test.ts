import Dimension from "../../../../../../src/domain/entity/Dimension";
import Item from "../../../../../../src/domain/entity/Item";
import ItemRepositoryDatabase from "../../../../../../src/infra/repository/database/mongodb/ItemRepositoryDatabase";

test("Deve retornar itens do banco de dados", async function () {
    const itemRepository = new ItemRepositoryDatabase();
    const items = await itemRepository.list();
    expect(items).toBeTruthy();
});

test("Deve salvar itens no banco de dados", async function () {
    const itemRepository = new ItemRepositoryDatabase();

    itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    itemRepository.save(
        new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    );
    itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));

    const items = await itemRepository.list();
    expect(items).toBeTruthy();
});

test("Deve retornar um item do banco de dados", async function () {
    const itemRepository = new ItemRepositoryDatabase();

    itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );

    const item = await itemRepository.get(1);
    expect(item).toBeInstanceOf(Item);
    expect(item.idItem).toBe(1);
    expect(item.description).toBe("Guitarra");
});
