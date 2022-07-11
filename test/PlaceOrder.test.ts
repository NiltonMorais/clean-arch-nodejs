test("Deve fazer um pedido", async function(){
    const placeOrder = new PlaceOrder();
    const input = {
        cpf: "935.411.347-80", 
        orderItems: [
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ]
    }
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6090);
});