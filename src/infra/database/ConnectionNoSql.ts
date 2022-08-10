export default interface ConnectionNoSql {
    findOne(collection: string, filter: object): Promise<any>;
    insertOne(collection: string, item: object): Promise<any>;
    list(collection: string): Promise<any[]>;
    count(collection: string): Promise<number>;
    clear(collection: string): Promise<void>;
    close(): Promise<void>;
}
