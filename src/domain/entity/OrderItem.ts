export default class OrderItem {
    constructor(
        readonly idItem: number,
        readonly price: number,
        readonly quantity: number
    ) {}

    getTotal(): number {
        return this.price * this.quantity;
    }
}
