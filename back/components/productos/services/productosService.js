const Producto = require("../productos")
const { crearProducto, modificarProducto, obtenerProductos, obtenerProductoPorID, borrarProducto } = require("../model/productosModel")
const Manejador = require("../../manejadores/manejadorArchivo")
const manejador = new Manejador("productos.txt")

class ProductosServices{
    constructor(){
        this.productos = [];
    }

    async getProductos(req){
        try {
            if (!req.params.id) {
                this.productos = await obtenerProductos()
                return this.productos
            } else {
                const producto = await obtenerProductoPorID(req.params.id)
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
            crearProducto(nuevoProducto)
        } catch (error) {
            return {error: error}
        }
    }

    async deleteProducto(req){
        try {
            return manejador.deleteById(req.params.id)
        } catch (error) {
            return {error: error}
        }
    }

    async modifyProducto(req){
        try {
            await modificarProducto(req.body._id, req.body)
            const productoModificado = await obtenerProductoPorID(req.body._id)
            console.log(productoModificado)
            return productoModificado
        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = new ProductosServices();