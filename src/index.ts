//Esta sección maneja la parte "gráfica" de mi programa

const add=document.querySelector('#add') as HTMLButtonElement;
const inputMonto=document.querySelector('#monto') as HTMLInputElement;
const inputDescripcion=document.querySelector('#descripcion') as HTMLInputElement;

const Expensas= new expensas();

//el ? es un opcional, "permite" que el elemento sea nulo; si pongo ! es que sé que el elemento NO VA A SER NULO
add!.addEventListener('click', x=>{
if(inputMonto!.value !='' && inputDescripcion!.value !='' && !isNaN(parseFloat(inputMonto!.value))){
    
    const monto:number=parseFloat(inputMonto!.value);
    const descripcion=inputDescripcion!.value;

    Expensas.add({
        titulo:descripcion,
        costo:monto
    })

    render();
}else{
    alert("Completa los datos correctamente!");
}
})


function render(){
    let html= "";
    Expensas.getItems().forEach(item=>{
        const{id, titulo, costo}=item;
        console.log(item);
        html += `
            <div class="item">
                <div>${costo}</div>
                <div>${titulo}</div>
                <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
            </div>
        `;
        inputMonto.value="";
        inputDescripcion.value="";
        
    });

    $('#items').innerHTML =html;
    $('#display').textContent! = Expensas.getTotal();

    $$('.bEliminar').forEach(bEliminar=>
        {bEliminar.addEventListener('click', e=>{
            const id= (e.target as HTMLButtonElement).getAttribute('data-id');

            Expensas.remove(parseInt(id!));

            render();
        })
    })
}

function $(selector:string):HTMLElement{
    return document.querySelector(selector) as HTMLElement;
}
function $$(selector:string):NodeListOf<Element>{
    return document.querySelectorAll(selector) as NodeListOf<Element>;
}