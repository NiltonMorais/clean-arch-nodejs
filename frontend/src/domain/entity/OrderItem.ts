export default class OrderItem {

    quantity: number = 1;

    constructor(readonly idItem: number, readonly price: number){
    }
}