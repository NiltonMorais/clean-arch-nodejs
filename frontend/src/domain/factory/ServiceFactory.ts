import ItemService from "../service/ItemService";
import OrderService from "../service/OrderService";

export default interface ServiceFactory {
    createItemService(): ItemService;
    createOrderService(): OrderService;
}