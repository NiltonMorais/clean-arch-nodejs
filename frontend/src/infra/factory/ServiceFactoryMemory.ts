import ServiceFactory from "../../domain/factory/ServiceFactory";
import ItemService from "../../domain/service/ItemService";
import OrderService from "../../domain/service/OrderService";
import ItemServiceMemory from "../../service/memory/ItemServiceMemory";
import OrderServiceMemory from "../../service/memory/OrderServiceMemory";

export default class ServiceFactoryMemory implements ServiceFactory {
    
    createItemService(): ItemService
    {
        return new ItemServiceMemory();
    }
    
    createOrderService(): OrderService
    {
        return new OrderServiceMemory();
    }
}