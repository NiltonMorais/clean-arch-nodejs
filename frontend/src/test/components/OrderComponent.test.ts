import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import OrderComponent from "../../components/OrderComponent.vue";
import Order from "../../domain/entity/Order";
import Item from "../../domain/entity/Item";

test("Deve criar o componente OrderComponent.vue", async function(){
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    
    const component = mount(OrderComponent, {
        props: { order }
    });

    expect(component.get("#order-total").text()).toBe("3000");
    
    await component.get("#bt-delete-item-1").trigger("click");
    expect(component.get("#order-total").text()).toBe("2000");

    await component.get("#bt-delete-item-1").trigger("click");
    expect(component.get("#order-total").text()).toBe("1000");
    
    await component.get("#bt-save-order").trigger("click");
    expect(component.emitted().saveOrder[0]).toEqual([order]);
});