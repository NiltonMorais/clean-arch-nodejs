import { test, expect } from "vitest";
import Item from "../../../domain/entity/Item";

test("Deve criar um item", function(){
    const item = new Item(1, "Guitarra", 1234);
    expect(item.idItem).toBe(1);
    expect(item.description).toBe("Guitarra");
    expect(item.price).toBe(1234);
    expect(item.priceFormatted).toContain("1.234,00");
});