import OrderCoupon from "../../../../src/domain/entity/OrderCoupon";

test("Deve calcular um desconto de cupom", function () {
    const coupon = new OrderCoupon("VALE20", 20);
    expect(coupon.calculateDiscount(1000)).toBe(200);
});
