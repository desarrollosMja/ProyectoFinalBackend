let { crearCarrito, traerCarrito, updateCarrito, borrarCarrito } = require("./crudFirebase")

class CarritosServices{

    async createCarrito(data){
        try {
            const carrito = {
                item: []
            }
            carrito.item.push(data.item)
            const idCarritoNuevo = await crearCarrito(carrito)
            return idCarritoNuevo
        } catch (error) {
            return error;
        }
    }

    async addProducto(req){
        try {
            const carrito = await this.getCarrito(req)
            carrito.item.push(req.body.item)
            await updateCarrito(req.params.id, carrito)
        } catch (error) {
            return error;
        }
    }

    async addUnidad(req){
        try {
            const carrito = await this.getCarrito({params: {id: req.params.idCarrito}})
            for (let i = 0; i < carrito.item.length; i++){
                if (carrito.item[i]._id == req.params.idProducto) {
                    carrito.item[i].addedToCart += 1
                }
            }
            await updateCarrito(req.params.idCarrito, carrito)
        } catch (error) {
            return error;
        }
    }

    async deleteProducto(req){
        try {
            const carrito = await this.getCarrito({params: {id: req.params.idCarrito}})
            for (let i = 0; i < carrito.item.length; i++){
                if (carrito.item[i]._id == req.params.idProducto) {
                    if (carrito.item.length == 1){
                        await borrarCarrito(req.params.idCarrito)
                    } else{
                        carrito.item.splice(i, 1);
                        await updateCarrito(req.params.idCarrito, carrito)
                    }
                }
            }
        } catch (error) {
            return error;
        }
    }

    async deleteCarrito(req){
        try {
            await borrarCarrito(req.params.id)
        } catch (error) {
            console.log("error:", error)
            return error;
        }
    }

    async getCarrito(req){
        try {
            const carrito = await traerCarrito(req.params.id);
            const carritoEncontrado = carrito.data()
            return carritoEncontrado
        } catch (error) {
            return error;
        }
    }
}

//const carrito = new CarritosServices()
//carrito.createCarrito({item: [{id:100, nombre: "Remera", precio: 600, addedToCart: 1}]})
//carrito.getCarrito("T8bCAkaYSN2FISB2YKSc")
//carrito.addProducto({params: {id: "Ej4d3UwEaMam0emyUSP9"}, body: {item: {id: 500, nombre: "Botines", precio: 4500, addedToCart: 1}}})
//carrito.addUnidad({params: {idCarrito: "Ej4d3UwEaMam0emyUSP9", idProducto: 700}})
//carrito.deleteCarrito({params: {id: "XD63pLgmr38yOsJFyixq"}})
//carrito.deleteProducto({params: {idCarrito: "Ej4d3UwEaMam0emyUSP9", idProducto: 500}})

module.exports = new CarritosServices()