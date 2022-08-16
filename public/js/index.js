"use strict";
//Esta sección maneja la parte "gráfica" de mi programa
//ACÁ PONGO QUERYSELECTOR O GETELEMENTBYID????
const add = document.querySelector('#add');
const inputMonto = document.querySelector('#monto');
const inputDescripcion = document.querySelector('#descripcion');
const Expensas = new expensas();
loadAPI();
function loadAPI() {
    fetch('api/api.json')
        .then(res => res.json())
        .then(json => {
        const items = json.items;
        items.forEach(item => {
            Expensas.add(item);
        });
        render();
    });
}
//el ? es un opcional, "permite" que el elemento sea nulo; si pongo ! es que sé que el elemento NO VA A SER NULO
add.addEventListener('click', x => {
    if (inputMonto.value != '' && inputDescripcion.value != '' && !isNaN(parseFloat(inputMonto.value))) {
        const monto = parseFloat(inputMonto.value);
        const descripcion = inputDescripcion.value;
        Expensas.add({
            titulo: descripcion,
            costo: monto
        });
        render();
    }
    else {
        alert("Completa los datos correctamente!");
    }
});
function render() {
    let html = "";
    Expensas.getItems().forEach(item => {
        const { id, titulo, costo } = item;
        html += `
            <div class="item">
                <div><span class="currency">${costo.valueOf}</span> ${costo.valueOf}</div>
                <div>${titulo}</div>
                <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
            </div>
        `;
    });
    $('#items').innerHTML = html;
    $('#display').textContent = Expensas.getTotal();
    $$('.bEliminar').forEach(bEliminar => {
        bEliminar.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            Expensas.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
