import Coupon from "../../../src/domain/entity/Coupon";
import CouponRepositoryMemory from "../../../src/infra/repository/memory/CouponRepositoryMemory";
import ValidateCoupon from "../../../src/application/ValidateCoupon";

test("Deve validar um cupom de desconto válido", async function () {
    const couponRepository = new CouponRepositoryMemory();
    couponRepository.save(
        new Coupon("VALE20", 20, new Date("2021-03-02T10:00:00"))
    );
    const validateCoupon = new ValidateCoupon(couponRepository);
    const input = {
        code: "VALE20",
        date: new Date("2021-03-01T10:00:00"),
    };
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeFalsy();
});

test("Deve validar um cupom de desconto expirado", async function () {
    const couponRepository = new CouponRepositoryMemory();
    couponRepository.save(
        new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00"))
    );
    const validateCoupon = new ValidateCoupon(couponRepository);
    const input = {
        code: "VALE20",
        date: new Date("2021-03-02T10:00:00"),
    };
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeTruthy();
});
