import Item from "../../domain/entity/Item";
import ItemService from "../../domain/service/ItemService";
import HttpClient from "../../infra/http/HttpClient";

export default class ItemServiceHttp implements ItemService {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string){}

    async list(): Promise<Item[]>
    {
        const itemsData = await this.httpClient.get(`${this.baseUrl}/items`);
        const items: Item[] = [];
        for(const itemData of itemsData){
            items.push(new Item(itemData.idItem, itemData.description, itemData.price));
        }
        return items;
    }
}