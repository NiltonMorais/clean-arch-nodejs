import Coupon from "../../../../domain/entity/Coupon";
import CouponRepository from "../../../../domain/repository/CouponRepository";
import ConnectionNoSql from "../../../database/ConnectionNoSql";

export default class CouponRepositoryDatabase implements CouponRepository {
    readonly collection: string = "coupons";

    constructor(readonly db: ConnectionNoSql) {}

    async get(code: string): Promise<Coupon> {
        const filter = { code };
        const couponData = await this.db.findOne(this.collection, filter);

        if (!couponData) {
            throw new Error("Coupon not found");
        }

        let expiredDate;

        if (couponData.expiredDate) {
            expiredDate = new Date(couponData.expiredDate);
        }

        return new Coupon(couponData.code, couponData.percentage, expiredDate);
    }

    async save(coupon: Coupon): Promise<void> {
        await this.db.insertOne(this.collection, coupon);
    }

    async clear(): Promise<void> {
        await this.db.clear(this.collection);
    }
}
