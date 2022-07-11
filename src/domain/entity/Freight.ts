import Item from "./Item";

export default class Freight {
    private total: number = 0;
    private DISTANCE = 1000;
    private FACTOR = 100;
    private MIN_FREIGHT = 10;

    addItem(item: Item, quantity: number): void {
        const freight =
            item.getVolume() *
            this.DISTANCE *
            (item.getDensity() / this.FACTOR);
        this.total += freight * quantity;
    }

    getTotal(): number {
        if (this.total && this.total < this.MIN_FREIGHT) {
            return this.MIN_FREIGHT;
        }

        return this.total;
    }
}
