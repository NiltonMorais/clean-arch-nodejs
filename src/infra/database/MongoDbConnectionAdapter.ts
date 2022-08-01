import ConnectionNoSql from "./ConnectionNoSql";
import { MongoClient, Collection, Db } from "mongodb";

export default class MongoDbConnectionAdapter implements ConnectionNoSql {
    connection: MongoClient;
    database: Db;
    collection: Collection;

    constructor() {
        this.connection = new MongoClient(
            "mongodb://root:example@nodeapp-mongo:27017?retryWrites=true&writeConcern=majority"
        );
        this.database = this.connection.db("local");
        this.collection = this.database.collection("test");
    }

    setCollection(collectionName: string): void {
        this.collection = this.database.collection(collectionName);
    }

    close(): Promise<void> {
        return this.connection.close();
    }

    async findOne(filter: object): Promise<any> {
        return await this.collection.findOne(filter);
    }

    async insertOne(item: object): Promise<any> {
        return await this.collection.insertOne(item);
    }

    async list(): Promise<any[]> {
        return await this.collection.find().toArray();
    }

    async count(): Promise<number> {
        return await this.collection.countDocuments();
    }
}
