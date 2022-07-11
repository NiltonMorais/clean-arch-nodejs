import Dimension from "./Dimension";
import ExpressAdapter from "./ExpressAdapter";
import GetItems from "./GetItems";
import Item from "./Item";
import ItemRepositoryDatabase from "./ItemRepositoryDatabase";
import PgPromiseConnectionAdapter from "./PgPromiseConnectionAdapter";

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);

const http = new ExpressAdapter();

http.on("GET", "/items", async function (params: any, body: any) {
    const getItems = new GetItems(itemRepository);
    const output = await getItems.execute();
    return output;
});

http.listen(3000);
