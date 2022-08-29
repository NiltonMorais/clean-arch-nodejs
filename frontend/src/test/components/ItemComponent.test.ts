import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ItemComponent from "../../components/ItemComponent.vue";
import Item from "../../domain/entity/Item";

test("Deve criar o componente ItemComponent.vue", async function(){
    const item = new Item(1, "Guitarra", 1000);
    
    const component = mount(ItemComponent, {
        props: { item }
    });

    expect(component.get("div").html()).toContain('Guitarra');
    expect(component.get("div").html()).toContain('1.000,00');
    await component.get("#bt-add-item").trigger("click");
    expect(component.emitted().addItem[0]).toEqual([item]);
});