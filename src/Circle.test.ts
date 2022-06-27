import Circle from "./Circle";

test("Deve calcular a área de um círculo", function () {
    const circle = new Circle(2);
    expect(circle.getArea()).toBe(12.566370614359172);
});
