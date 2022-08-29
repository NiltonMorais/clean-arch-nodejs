import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {

    orderItems: OrderItem[] = [];
    total: number = 0;
    code: string = '';

    constructor(readonly cpf: string){
    }

    addItem(item: Item){
        const itemExists = this.orderItems.find(orderItem => orderItem.idItem === item.idItem);
        if(itemExists){
            itemExists.quantity++;
        }else{
            this.orderItems.push(new OrderItem(item.idItem, item.price));
        }
        this.total += item.price;
    }

    deleteOrderItem(idItem: number){
        const orderItemIndex = this.orderItems.findIndex(orderItem => orderItem.idItem === idItem);

        if(orderItemIndex < 0){
            throw new Error(`OrderItem id ${orderItemIndex} not found`);
        }

        this.total -= this.orderItems[orderItemIndex].price;
        
        if(this.orderItems[orderItemIndex].quantity > 1){
            this.orderItems[orderItemIndex].quantity--;
        }else{
            this.orderItems.splice(orderItemIndex,1);
        }
    }
}