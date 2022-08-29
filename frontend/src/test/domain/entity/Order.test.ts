import { test, expect } from "vitest";
import Item from "../../../domain/entity/Item";
import Order from '../../../domain/entity/Order';
import OrderItem from "../../../domain/entity/OrderItem";

test("Deve criar um pedido", function(){
    const order = new Order("935.411.347-80");
    expect(order.total).toBe(0);
});

test("Deve adicionar um item no pedido", function(){
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000));
    expect(order.orderItems).toHaveLength(1);
    expect(order.orderItems[0].idItem).toBe(1);
    expect(order.orderItems[0].price).toBe(1000);
    expect(order.orderItems[0].quantity).toBe(1);
    expect(order.total).toBe(1000);
});

test("Deve adicionar vários itens iguais no pedido", function(){
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    expect(order.orderItems).toHaveLength(1);
    expect(order.orderItems[0].idItem).toBe(1);
    expect(order.orderItems[0].price).toBe(1000);
    expect(order.orderItems[0].quantity).toBe(3);
    expect(order.total).toBe(3000);
});

test("Deve remover um item do pedido", function(){
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000));
    order.deleteOrderItem(1);
    expect(order.orderItems).toHaveLength(0);
    expect(order.total).toBe(0);
});

test("Deve remover uma quantidade do item no pedido", function(){
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    order.deleteOrderItem(1);
    
    expect(order.orderItems[0].quantity).toBe(2);
    expect(order.total).toBe(2000);
});

test("Deve remover duas quantidades do item no pedido", function(){
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    order.addItem(new Item(1, "Guitarra", 1000));
    order.deleteOrderItem(1);
    order.deleteOrderItem(1);
    expect(order.orderItems).toHaveLength(1);
    expect(order.total).toBe(1000);
});

test("Deve remover um item do pedido que contém várias quantidades", function(){
    const order = new Order("935.411.347-80");
    order.addItem(new Item(2, "Guitarra", 1000));
    order.addItem(new Item(2, "Guitarra", 1000));
    order.addItem(new Item(2, "Guitarra", 1000));
    order.deleteOrderItem(2);
    order.deleteOrderItem(2);
    order.deleteOrderItem(2);
    expect(order.orderItems).toHaveLength(0);
    expect(order.total).toBe(0);
});