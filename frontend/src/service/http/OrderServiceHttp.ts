import Order from "../../domain/entity/Order";
import OrderService from "../../domain/service/OrderService";
import HttpClient from "../../infra/http/HttpClient";

export default class OrderServiceHttp implements OrderService {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string){}

    async save(order: Order): Promise<{code: string, total: number}>
    {
        return await this.httpClient.post(`${this.baseUrl}/orders`, order);
    }
}