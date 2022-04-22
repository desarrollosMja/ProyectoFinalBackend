const Producto = require("../productos")
const { crearProducto, modificarProducto, obtenerProductos, obtenerProductoPorID, borrarProducto } = require("../model/productosModel")

class ProductosServices{
    constructor(){
        this.productos = [];
    }

    async getProductos(req){
        try {
            if (!req.params.pid) {
                this.productos = await obtenerProductos()
                return this.productos
            } else {
                const producto = await obtenerProductoPorID(req.params.pid)
                if (producto == false){
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
            await crearProducto(nuevoProducto)
            const productos = await obtenerProductos()
            return productos
        } catch (error) {
            return {error: error}
        }
    }

    async deleteProducto(req){
        try {
            await borrarProducto(req.params.pid)
            const productos = await obtenerProductos()
            return productos
        } catch (error) {
            return {error: error}
        }
    }

    async modifyProducto(req){
        try {
            await modificarProducto(req.body._id, req.body)
            const productos = await obtenerProductos()
            return productos
        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = new ProductosServices();