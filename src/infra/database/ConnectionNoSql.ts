export default interface ConnectionNoSql {
    setCollection(collectionName: string): void;
    findOne(filter: object): Promise<any>;
    insertOne(item: object): Promise<any>;
    list(): Promise<any[]>;
    count(): Promise<number>;
    close(): Promise<void>;
}
