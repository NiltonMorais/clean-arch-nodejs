export default class Coupon {
    constructor(
        readonly code: string,
        readonly percentage: number,
        readonly expiredDate?: Date
    ) {}

    calculateDiscount(total: number): number {
        return (total * this.percentage) / 100;
    }

    isExpired(today: Date): boolean {
        if (!this.expiredDate) return false;
        return today.getTime() > this.expiredDate.getTime();
    }
}
