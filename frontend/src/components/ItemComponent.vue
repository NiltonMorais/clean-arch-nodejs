<script setup lang="ts">
defineProps(["item"]);
defineEmits(["addItem"]);
</script>
<template>
    <div>
        {{ item.idItem }} - {{ item.description }} : {{ item.priceFormatted }} 
        <button id="bt-add-item" @click="$emit('addItem', item)">Add Item</button>
    </div>
</template>