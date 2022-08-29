import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PlaceOrderView from "../../views/PlaceOrderView.vue";
import ServiceFactoryMemory from "../../infra/factory/ServiceFactoryMemory";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("Deve criar o componente PlaceOrderView", async function(){
    const serviceFactory = new ServiceFactoryMemory();
    const component = mount(PlaceOrderView, {
        global: { 
            provide: { 
                serviceFactory
            }
        }
    });
    await component.vm.$forceUpdate();
    await sleep(200);
    expect(component.get(".item:nth-of-type(1)").html()).toContain('Bateria');
    expect(component.get(".item:nth-of-type(2)").html()).toContain('Violão');
    expect(component.get(".item:nth-of-type(3)").html()).toContain('Banjo');

    expect(component.get("#order-total").text()).toBe("0");

    await component.get(".item:nth-of-type(1) #bt-add-item").trigger("click");
    expect(component.get("#order-total").text()).toBe("7000");

    await component.get(".item:nth-of-type(2) #bt-add-item").trigger("click");
    expect(component.get("#order-total").text()).toBe("8459");
    
    await component.get(".item:nth-of-type(3) #bt-add-item").trigger("click");
    expect(component.get("#order-total").text()).toBe("9619");
    
    await component.get(".item:nth-of-type(3) #bt-add-item").trigger("click");
    expect(component.get("#order-total").text()).toBe("10779");
    
    await component.get("#bt-delete-item-6").trigger("click");
    expect(component.get("#order-total").text()).toBe("9619");
    
    await component.get("#bt-save-order").trigger("click");
    expect(component.get("#message").text()).toBe("Pedido #202100000001 criado com sucesso!"); 
});