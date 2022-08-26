import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";

export default class StockEntryRepositoryMemory implements StockEntryRepository {

    data: StockEntry[] = [];

    async save(stockEntry: StockEntry): Promise<void> {
        this.data.push(stockEntry);
    }

    async listByIdItem(idItem: number): Promise<StockEntry[]> {
        return this.data.filter((stockItem) => stockItem.idItem === idItem);
    }
    
    async clear(): Promise<void> {
        this.data = [];
    }
}
