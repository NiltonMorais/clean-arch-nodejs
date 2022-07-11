export default class Dimension {
    constructor(
        readonly width: number,
        readonly height: number,
        readonly length: number
    ) {}

    getVolume(): number {
        if (this.height && this.width && this.length) {
            return (
                (this.width / 100) * (this.height / 100) * (this.length / 100)
            );
        }

        return 0;
    }
}
