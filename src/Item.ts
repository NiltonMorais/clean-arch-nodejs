import Dimension from "./Dimension";
export default class Item {
    constructor(
        readonly idItem: number,
        readonly description: string,
        readonly price: number,
        readonly dimension?: Dimension,
        readonly weight?: number
    ) {}

    getVolume(): number {
        if (this.dimension) {
            return this.dimension.getVolume();
        }
        return 0;
    }

    getDensity(): number {
        if (this.dimension && this.weight) {
            return this.weight / this.dimension.getVolume();
        }

        return 0;
    }
}
