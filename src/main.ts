import ExpressAdapter from "./infra/http/ExpressAdapter";
import GetItems from "./application/GetItems";
import ItemRepositoryDatabase from "./infra/repository/database/pg-promise/ItemRepositoryDatabase";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);

const http = new ExpressAdapter();

http.on("GET", "/items", async function (params: any, body: any) {
    const getItems = new GetItems(itemRepository);
    const output = await getItems.execute();
    return output;
});

http.listen(3000);
