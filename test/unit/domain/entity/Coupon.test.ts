import Coupon from "../../../../src/domain/entity/Coupon";

test("Deve criar um cupom", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2021-03-02T10:00:00"));
    const isExpired = coupon.isExpired(new Date("2021-03-01T11:00:00"));
    expect(isExpired).toBeFalsy();
});

test("Deve criar um cupom expirado", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00"));
    const isExpired = coupon.isExpired(new Date("2021-03-01T11:00:00"));
    expect(isExpired).toBeTruthy();
});
