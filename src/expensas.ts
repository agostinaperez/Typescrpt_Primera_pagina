//exp se refiere a cada objeto o servicio que agregaré a mis expensas, con su costo, id y descripción
interface exp{
    id?:number;
    titulo:string;
    costo:number;
}

interface IExpensas{
    expensas:ArrayList<exp>;
    add(item:exp):boolean;
    get(index:number):exp|null;
    remove(id:number):boolean;
}

//clase genérica, por eso le pongo la T
class ArrayList<T>{

    private items:T[];
    constructor(){
        this.items=[];
    }

    add(item:T){
        this.items.push(item);
    }

    get(index:number):T|null{
        const item:T[]=this.items.filter ((x:T, i:number)=>{
            return i===index;
        });

        if(item.length===0){
            return null;
        }else{
            return item[0];
        }
    }

    createFrom(value:T[]){
        this.items=[...value];
    }

    getAll():T[]{
        return this.items;
    }
}


class expensas implements IExpensas{
    expensas: ArrayList<exp>;

    //Esto es para mis Id's
    private contador=1;

    constructor(){
        this.expensas=new ArrayList<exp>;
    }
    add(item: exp): boolean {
        item.id=this.contador;
        this.contador++;
        this.expensas.add(item);
        return true;
    }
    get(index:number): exp | null {
        return this.expensas.get(index);
    }
    
    //Lo que estoy haciendo acá es, básicamente, filtrando los elementos para que me quede un nuevo array con todos
    //mismos elementos, excepto el elemento cuyo id sea igual al que yo ingresé.
    remove(id: number): boolean {
        const items:exp[] = this.getItems().filter(item =>{
            return item.id != id
        });

        this.expensas.createFrom(items);
        return true;
    }
    
    getItems():exp[]{
        return this.expensas.getAll();
    }
    
    getTotal():string{
        const total:number = this.expensas.getAll().reduce( (acc:number, item:exp) =>{
            return acc +=item.costo;
        }, 0);

        return `  $${total.toString()}`;
    }
}