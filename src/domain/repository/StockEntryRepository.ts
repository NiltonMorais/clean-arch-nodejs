import StockEntry from "../entity/StockEntry";

export default interface StockEntryRepository {
    save(stockEntry: StockEntry): Promise<void>;
    listByIdItem(idItem: number): Promise<StockEntry[]>;
    clear(): Promise<void>;
}
