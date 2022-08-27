import ConnectionNoSql from "./ConnectionNoSql";
import { MongoClient, Db } from "mongodb";

export default class MongoDbConnectionAdapter implements ConnectionNoSql {
    connection: MongoClient;
    database: Db;

    constructor() {
        this.connection = new MongoClient(
            "mongodb://root:example@nodeapp-mongo:27017?retryWrites=true&writeConcern=majority"
        );
        this.database = this.connection.db("local");
    }

    close(): Promise<void> {
        return this.connection.close();
    }

    async findOne(collection: string, filter: object): Promise<any> {
        return await this.database.collection(collection).findOne(filter);
    }

    async insertOne(collection: string, item: object): Promise<any> {
        return await this.database.collection(collection).insertOne(item);
    }

    async list(collection: string, filter: object = {}): Promise<any[]> {
        return await this.database
            .collection(collection)
            .find(filter)
            .toArray();
    }

    async count(collection: string): Promise<number> {
        return await this.database.collection(collection).countDocuments();
    }

    async clear(collection: string): Promise<void> {
        await this.database.collection(collection).deleteMany({});
    }
}
