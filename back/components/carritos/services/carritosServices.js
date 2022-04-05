//let { crearCarrito, traerCarrito, updateCarrito, borrarCarrito } = require("./crudFirebase")
const ManejadorCarritos = require("../../../utils/fileSystem/fsCarritos")
const manejador = new ManejadorCarritos("carritos.txt")

class CarritosServices{

    async createCarrito(data){
        const cartId = await manejador.createCart(data)
        return cartId
        /*Volver a usar cuando retorne a DB*/
        // try {
        //     const carrito = {
        //         item: []
        //     }
        //     carrito.item.push(data.item)
        //     const idCarritoNuevo = await crearCarrito(carrito)
        //     return idCarritoNuevo
        // } catch (error) {
        //     return error;
        // }
    }

    async addProducto(req){
        const carritos = await manejador.getCart()
        for (const carrito of carritos) {
            if (carrito.id == req.params.cid){
                carrito.items.push(req.body.item)
            }
        }
        await manejador.updateCart(carritos)

        /*Volver a usar cuando retorne a DB*/
        // try {
        //     const carrito = await this.getCarrito(req)
        //     carrito.item.push(req.body.item)
        //     await updateCarrito(req.params.id, carrito)
        // } catch (error) {
        //     return error;
        // }
    }

    async addUnidad(req){
        const carritos = await manejador.getCart()
        for (const carrito of carritos) {
            if (carrito.id == req.params.cid){
                carrito.items.forEach(item => {
                    if (item.id == req.params.pid){
                        item.addedToCart++
                    }
                })
            }
        }
        await manejador.updateCart(carritos)

        /*Volver a usar cuando retorne a DB*/
        // try {
        //     const carrito = await this.getCarrito({params: {id: req.params.idCarrito}})
        //     for (let i = 0; i < carrito.item.length; i++){
        //         /*Cuando vuelva a usar DB cambiar "id" por "_id"*/
        //         if (carrito.item[i].id == req.params.idProducto) {
        //             carrito.item[i].addedToCart += 1
        //         }
        //     }
        //     await updateCarrito(req.params.idCarrito, carrito)
        // } catch (error) {
        //     return error;
        // }
    }

    async deleteProducto(req){
        const carritos = await manejador.getCart()
        for (const carrito of carritos) {
            for (let i = 0; i < carrito.items.length; i++){
                if (carrito.items[i].id == req.params.pid) {
                    if (carrito.items.length == 1){
                        await manejador.deleteCart(req.params.cid)
                    } else{
                        carrito.items.splice(i, 1);
                        await manejador.updateCart(carritos)
                    }
                }
            }
        }

        /*Volver a usar cuando retorne a DB*/
        // try {
        //     const carrito = await this.getCarrito({params: {id: req.params.idCarrito}})
        //     for (let i = 0; i < carrito.item.length; i++){
        //         /*Cuando vuelva a usar DB cambiar "id" por "_id"*/
        //         if (carrito.item[i].id == req.params.idProducto) {
        //             if (carrito.item.length == 1){
        //                 await borrarCarrito(req.params.idCarrito)
        //             } else{
        //                 carrito.item.splice(i, 1);
        //                 await updateCarrito(req.params.idCarrito, carrito)
        //             }
        //         }
        //     }
        // } catch (error) {
        //     return error;
        // }
    }

    async deleteCarrito(req){
        await manejador.deleteCart(req.params.cid)
        /*Volver a usar cuando retorne a DB*/
        // try {
        //     await borrarCarrito(req.params.id)
        // } catch (error) {
        //     console.log("error:", error)
        //     return error;
        // }
    }

    async getCarrito(req){
        const carritos = await manejador.getCart()
        const carritoEncontrado = carritos.find(elem => elem.id == req.params.cid)
        return carritoEncontrado
        /*Volver a usar cuando retorne a DB*/
        // try {
        //     const carrito = await traerCarrito(req.params.id);
        //     const carritoEncontrado = carrito.data()
        //     return carritoEncontrado
        // } catch (error) {
        //     return error;
        // }
    }
}

module.exports = new CarritosServices()