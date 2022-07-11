import Item from "./Item";

export default interface ItemRepository {
    get(idItem: number): Promise<Item>
}