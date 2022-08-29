import ServiceFactory from "../../domain/factory/ServiceFactory";
import ItemService from "../../domain/service/ItemService";
import OrderService from "../../domain/service/OrderService";
import ItemServiceHttp from "../../service/http/ItemServiceHttp";
import OrderServiceHttp from "../../service/http/OrderServiceHttp";
import HttpClient from "../http/HttpClient";

export default class ServiceFactoryHttp implements ServiceFactory {
    
    constructor(readonly httpClient: HttpClient, readonly baseUrl: string){}

    createItemService(): ItemService
    {
        return new ItemServiceHttp(this.httpClient, this.baseUrl);
    }
    
    createOrderService(): OrderService
    {
        return new OrderServiceHttp(this.httpClient, this.baseUrl);
    }
}