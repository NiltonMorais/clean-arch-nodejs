import Item from "../entity/Item";

export default interface ItemService {
    list(): Promise<Item[]>;
}