"use strict";
//clase genérica, por eso le pongo la T
class ArrayList {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, i) => {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    }
    createFrom(value) {
        this.items = [...value];
    }
    getAll() {
        return this.items;
    }
}
class expensas {
    constructor() {
        //Esto es para mis Id's
        this.contador = 1;
        this.expensas = new ArrayList;
    }
    add(item) {
        item.id = this.contador;
        this.contador++;
        this.expensas.add(item);
        return true;
    }
    get(index) {
        return this.expensas.get(index);
    }
    //Lo que estoy haciendo acá es, básicamente, filtrando los elementos para que me quede un nuevo array con todos
    //mismos elementos, excepto el elemento cuyo id sea igual al que yo ingresé.
    remove(id) {
        const items = this.getItems().filter(item => {
            return item.id != id;
        });
        this.expensas.createFrom(items);
        return true;
    }
    getItems() {
        return this.expensas.getAll();
    }
    getTotal() {
        const total = this.expensas.getAll().reduce((acc, item) => {
            return acc += item.costo;
        }, 0);
        return `  $${total.toString()}`;
    }
}
