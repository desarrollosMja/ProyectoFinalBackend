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
            await updateCarrito(req.params.cid, carrito)
        } catch (error) {
            return error;
        }
    }

    async addUnidad(req){
        try {
            const carrito = await this.getCarrito({params: {cid: req.params.cid}})
            for (let i = 0; i < carrito.item.length; i++){
                if (carrito.item[i]._id == req.params.pid) {
                    carrito.item[i].addedToCart += 1
                }
            }
            await updateCarrito(req.params.cid, carrito)
        } catch (error) {
            return error;
        }
    }

    async deleteProducto(req){
        try {
            const carrito = await this.getCarrito({params: {cid: req.params.cid}})
            for (let i = 0; i < carrito.item.length; i++){
                if (carrito.item[i]._id == req.params.pid) {
                    if (carrito.item.length == 1){
                        await borrarCarrito(req.params.cid)
                    } else{
                        carrito.item.splice(i, 1);
                        await updateCarrito(req.params.cid, carrito)
                    }
                }
            }
        } catch (error) {
            return error;
        }
    }

    async deleteCarrito(req){
        try {
            await borrarCarrito(req.params.cid)
        } catch (error) {
            console.log("error:", error)
            return error;
        }
    }

    async getCarrito(req){
        try {
            const carrito = await traerCarrito(req.params.cid);
            const carritoEncontrado = carrito.data()
            return carritoEncontrado
        } catch (error) {
            return error;
        }
    }
}

module.exports = new CarritosServices()