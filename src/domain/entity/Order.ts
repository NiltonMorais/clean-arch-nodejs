import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Freight from "./Freight";
import OrderCode from "./OrderCode";

export default class Order {
    cpf: Cpf;
    orderItems: OrderItem[];
    coupon?: Coupon;
    freight = new Freight();
    code: OrderCode;

    constructor(
        cpf: string,
        readonly date: Date = new Date(),
        readonly sequence: number = 1
    ) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.code = new OrderCode(date, sequence);
    }

    addItem(item: Item, quantity: number) {
        this.freight.addItem(item, quantity);
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    }

    addCoupon(coupon: Coupon) {
        if (!coupon.isExpired(this.date)) {
            this.coupon = coupon;
        }
    }

    getFreight(): number {
        return this.freight.getTotal();
    }

    getTotal(): number {
        let total = this.orderItems.reduce((total, orderItem) => {
            total += orderItem.getTotal();
            return total;
        }, 0);

        if (this.coupon) total -= this.coupon.calculateDiscount(total);

        total += this.freight.getTotal();
        return total;
    }
}
