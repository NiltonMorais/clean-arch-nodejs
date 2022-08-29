import Item from "../../domain/entity/Item";
import ItemService from "../../domain/service/ItemService";

export default class ItemServiceMemory implements ItemService {

    async list(): Promise<Item[]>
    {
        const items: Item[] = [];
        items.push(new Item(4, "Bateria", 7000));
        items.push(new Item(5, "Violão", 1459));
        items.push(new Item(6, "Banjo", 1160));
        return items;
    }
}