export default class OrderCoupon {
    constructor(readonly code: string, readonly percentage: number) {}

    calculateDiscount(total: number): number {
        return (total * this.percentage) / 100;
    }
}
