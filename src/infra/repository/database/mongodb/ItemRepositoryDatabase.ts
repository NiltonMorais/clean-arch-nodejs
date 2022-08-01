import Item from "../../../../domain/entity/Item";
import ItemRepository from "../../../../domain/repository/ItemRepository";
import ConnectionNoSql from "../../../database/ConnectionNoSql";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(readonly db: ConnectionNoSql) {
        this.db.setCollection("items");
    }

    async get(idItem: number): Promise<Item> {
        const filter = { idItem: idItem };
        const itemData = await this.db.findOne(filter);

        if (!itemData) {
            throw new Error("Item not found");
        }

        return new Item(
            itemData.idItem,
            itemData.description,
            parseFloat(itemData.price)
        );
    }

    async save(item: Item): Promise<void> {
        await this.db.insertOne(item);
    }

    async list(): Promise<Item[]> {
        const itemsData = await this.db.list();
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
