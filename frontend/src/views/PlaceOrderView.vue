<script setup lang="ts">
import { reactive, onMounted, inject } from "vue";
import Order from '../domain/entity/Order';
import ServiceFactory from '../domain/factory/ServiceFactory';
import ItemComponent from "../components/ItemComponent.vue";
import Item from "../domain/entity/Item";
import OrderComponent from "../components/OrderComponent.vue";

const state = reactive<{message: string, items: Item[], order: Order}>({ message: "", items: [], order: new Order("935.411.347-80")});

const serviceFactory = inject("serviceFactory") as ServiceFactory;
const itemService = serviceFactory.createItemService();
const orderService = serviceFactory.createOrderService();

const saveOrder = async function(order: Order){
    const newOrder = await orderService.save(order);
    state.order.code = newOrder.code;
    state.message = `Pedido #${newOrder.code} criado com sucesso!`;
}

const addItem = function(item: Item){
    state.order.addItem(item);
}

onMounted(async () => {
    state.items = await itemService.list();
});

</script>

<template>
    <div class="main">
        <div id="message" v-if="state.message">{{ state.message }}</div>
        <br/>
        <div class="items">
            <h3>Items</h3>
            <hr/>
            <div class="item" v-for="item in state.items" :key="item.idItem">
                <ItemComponent :item="item" @add-item="addItem"/>
            </div>
        </div>
        <div class="order">
            <OrderComponent :order="state.order" @save-order="saveOrder"/>
        </div>
    </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;  
}
.items {
    width: 70%;
}
.order {
    width: 30%
}
</style>