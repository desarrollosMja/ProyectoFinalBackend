const Manejador = require('../../manejadores/manejadorArchivo');
const manejador = new Manejador("carritos.txt")

class CarritosServices{
    constructor(){
        this.id;
        this.timestamp = Date.now();
        this.items = [];
    }

    async createCarrito(carrito, id){
        try {
            let carritosGuardados = await manejador.getAll();
            this.id = id;
            this.items = []
            this.items.push(carrito.item)
            carritosGuardados.push(this);
            await manejador.save(carritosGuardados)
        } catch (error) {
            return error;
        }
    }

    async addProducto(req){
        try {
            const carritos = await manejador.getAll();
            for (const carrito of carritos) {
                if (carrito.id == req.params.id) {
                    carrito.items.push(req.body.item);
                }
            }
            await manejador.save(carritos);
        } catch (error) {
            return error;
        }
    }

    async addUnidad(req){
        try {
            const carritos = await manejador.getAll();
            for (const carrito of carritos) {
                if (carrito.id == req.params.idCarrito) {
                    for (const item of carrito.items) {
                        if (item.id == req.params.idProducto) {
                            item.addedToCart += 1;
                        }
                    }
                }
            }
            await manejador.save(carritos);
        } catch (error) {
            return error;
        }
    }

    async deleteProducto(req){
        try {
            const carritos = await manejador.getAll();
            for (const carrito of carritos) {
                if (carrito.id == req.params.idCarrito) {
                    for (const item of carrito.items) {
                        if (item.id == req.params.idProducto) {
                            carrito.items.splice(carrito.items.indexOf(item), 1);
                        }
                    }
                }
            }
            await manejador.save(carritos);
        } catch (error) {
            return error;
        }
    }

    async deleteCarrito(req){
        try {
            const carritos = await manejador.getAll();
            for (const carrito of carritos) {
                if (carrito.id == req.params.id) {
                    carritos.splice(carritos.indexOf(carrito), 1);
                }
            }
            await manejador.save(carritos);
        } catch (error) {
            console.log("error:", error)
            return error;
        }
    }

    async getCarrito(req){
        try {
            const carritos = await manejador.getAll();
            const carrito = carritos.find(carrito => carrito.id == req.params.id);
            return carrito;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new CarritosServices()