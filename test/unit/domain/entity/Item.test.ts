import Dimension from "../../../../src/domain/entity/Dimension";
import Item from "../../../../src/domain/entity/Item";

test("Deve lançar uma exception se o peso for negativo", function () {
    expect(
        () => new Item(3, "Cabo", 30, new Dimension(10, 10, 10), -1)
    ).toThrow(new Error("Invalid weight"));
});
