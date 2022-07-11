import PgPromiseConnectionAdapter from '../src/PgPromiseConnectionAdapter';
import ItemRepositoryDatabase from '../src/ItemRepositoryDatabase';

test("Deve retornar itens do banco de dados", async function(){
    const connection = new PgPromiseConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const items = await itemRepository.list();
    expect(items).toHaveLength(3);
});