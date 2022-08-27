import StockEntry from "../../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../../domain/repository/StockEntryRepository";
import ConnectionNoSql from "../../../database/ConnectionNoSql";

export default class StockEntryRepositoryDatabase
    implements StockEntryRepository
{
    readonly collection: string = "stock_entries";

    constructor(readonly db: ConnectionNoSql) {}

    async save(stockEntry: StockEntry): Promise<void> {
        await this.db.insertOne(this.collection, stockEntry);
    }

    async listByIdItem(idItem: number): Promise<StockEntry[]> {
        const filter = { idItem };
        const stockEntriesData = await this.db.list(this.collection, filter);
        const items: StockEntry[] = [];

        for (const itemData of stockEntriesData) {
            items.push(
                new StockEntry(
                    itemData.idItem,
                    itemData.operation,
                    itemData.quantity
                )
            );
        }
        return items;
    }

    async clear(): Promise<void> {
        await this.db.clear(this.collection);
    }
}
