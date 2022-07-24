import Item from "../../../../domain/entity/Item";
import ItemRepository from "../../../../domain/repository/ItemRepository";
import { MongoClient, Collection, Db } from "mongodb";

export default class ItemRepositoryDatabase implements ItemRepository {
    connection: MongoClient;
    database: Db;
    collection: Collection;

    constructor() {
        this.connection = new MongoClient(
            "mongodb://root:example@nodeapp-mongo:27017?retryWrites=true&writeConcern=majority"
        );
        this.database = this.connection.db("local");
        this.collection = this.database.collection("items");
    }

    async get(idItem: number): Promise<Item> {
        const query = { idItem: idItem };
        const itemData = await this.collection.findOne(query);

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
        await this.collection.insertOne(item);
    }

    async list(): Promise<Item[]> {
        const itemsData = await this.collection.find().toArray();
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
