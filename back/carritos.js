export default class Carrito{
    constructor(id, producto){
        this.id = id
        this.timestamp = Date.now()
        this.producto = producto
    }
}