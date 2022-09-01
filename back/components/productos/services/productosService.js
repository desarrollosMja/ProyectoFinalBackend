const Producto = require("../productos")
const daosFactory = require("../../../models/daoFactory.js")

class ProductosServices{
    async getProductos(req){
        try {
            if (!req.params.pid) {
                return await daosFactory.getAllProducts()
            } else {
                const producto = await daosFactory.getOneProduct(req.params.pid)
                if (producto == null){
                    return {error: "El id ingresado no corresponde a un producto"}
                } else return producto
            }
        } catch (error) {
            return {error: error}
        }
    }

    async createProducto(req){
        try {
            let {nombre, descripcion, codigo, urlFoto, precio, stock} = req.body
            const nuevoProducto = new Producto(nombre, descripcion, codigo, urlFoto, precio, stock)
            await daosFactory.setNewProduct(nuevoProducto)
            return await daosFactory.getAllProducts()
        } catch (error) {
            return {error: error}
        }
    }

    async deleteProducto(req){
        try {
            await daosFactory.deleteProduct(req.params.pid)
            return await daosFactory.getAllProducts()
        } catch (error) {
            return {error: error}
        }
    }

    async modifyProducto(req){
        try {
            await daosFactory.updateProduct(req)
            return await daosFactory.getAllProducts()
        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = new ProductosServices();