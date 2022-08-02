import Dimension from "../../../../domain/entity/Dimension";
import Item from "../../../../domain/entity/Item";
import ItemRepository from "../../../../domain/repository/ItemRepository";
import ConnectionNoSql from "../../../database/ConnectionNoSql";

export default class ItemRepositoryDatabase implements ItemRepository {
    readonly collection: string = "items";

    constructor(readonly db: ConnectionNoSql) {
    }

    async get(idItem: number): Promise<Item> {
        const filter = { idItem: idItem };
        const itemData = await this.db.findOne(this.collection, filter);

        if (!itemData) {
            throw new Error("Item not found");
        }

        let dimension = undefined;
        if(itemData.dimension){
            dimension = new Dimension(itemData.dimension.width, itemData.dimension.height, itemData.dimension.length);
        }

        return new Item(
            itemData.idItem,
            itemData.description,
            parseFloat(itemData.price),
            dimension,
            itemData.weight
        );
    }

    async save(item: Item): Promise<void> {
        await this.db.insertOne(this.collection, item);
    }

    async list(): Promise<Item[]> {
        const itemsData = await this.db.list(this.collection);
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

    async clear(): Promise<void> {
        await this.db.clear(this.collection);
    }
}
