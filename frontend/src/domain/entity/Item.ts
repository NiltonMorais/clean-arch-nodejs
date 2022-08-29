export default class Item {

    priceFormatted: string;

    constructor(readonly idItem: number, readonly description: string, readonly price: number){
        this.priceFormatted = this.moneyFormat(price);
    }

    private moneyFormat(amount: number): string {
        return new Intl.NumberFormat("pt-br", { currency: "BRL", style: "currency"}).format(amount);
    }
}