import Dimension from '../../../src/domain/entity/Dimension';
import Item from '../../../src/domain/entity/Item';
import StockEntry from '../../../src/domain/entity/StockEntry';
import MemoryRepositoryFactory from '../../../src/infra/factory/MemoryRepositoryFactory';
import GetStock from '../../../src/application/GetStock';

test("Deve retornar o estoque de um item", async function(){
    const repositoryFactory = new MemoryRepositoryFactory();
    const itemRepository = repositoryFactory.createItemRepository();
    itemRepository.save(
        new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
    );
    const stockEntryRepository = repositoryFactory.createStockEntryRepository();
    await stockEntryRepository.save(new StockEntry(1, "in", 10));
    await stockEntryRepository.save(new StockEntry(1, "in", 10));
    await stockEntryRepository.save(new StockEntry(1, "out", 5));
    await stockEntryRepository.save(new StockEntry(1, "out", 5));
    const getStock = new GetStock(repositoryFactory);
    const output = await getStock.execute(1);
    expect(output.total).toBe(10);
});