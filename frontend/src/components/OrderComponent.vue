<script setup lang="ts">
defineProps(["order"])
defineEmits(["saveOrder"])
</script>

<template>
    <div>
        <h3>Order - Total: <span id="order-total">{{ order.total }}</span></h3>
        <hr/>
        <div v-for="orderItem in order.orderItems">
            Item {{ orderItem.idItem}} Qtd {{ orderItem.quantity}} 
            <button :id="'bt-delete-item-'+orderItem.idItem" @click="order.deleteOrderItem(orderItem.idItem)">Delete</button>
        </div>
        <button id="bt-save-order" @click="$emit('saveOrder',order)">Save Order</button>
    </div>
</template>