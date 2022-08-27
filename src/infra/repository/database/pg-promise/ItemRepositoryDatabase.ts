import Connection from "../../../database/ConnectionSql";
import Item from "../../../../domain/entity/Item";
import ItemRepository from "../../../../domain/repository/ItemRepository";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(readonly connection: Connection) {}

    clear(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async get(idItem: number): Promise<Item> {
        throw new Error("Method not implemented");
    }

    async save(item: Item): Promise<void> {
        throw new Error("Method not implemented");
    }

    async list(): Promise<Item[]> {
        const itemsData = await this.connection.query(
            "select * from ccca.item",
            []
        );
        const items: Item[] = [];
        for (const itemData of itemsData) {
            items.push(
                new Item(
                    itemData.id_item,
                    itemData.description,
                    parseFloat(itemData.price)
                )
            );
        }
        return items;
    }
}
