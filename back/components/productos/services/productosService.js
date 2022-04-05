const Producto = require("../productos")
//const { crearProducto, modificarProducto, obtenerProductos, obtenerProductoPorID, borrarProducto } = require("../model/productosModel")
const ManejadorProductos = require("../../../utils/fileSystem/fsService")
const manejadorArhcivos = new ManejadorProductos("productos.txt")

class ProductosServices{
    constructor(){
        this.productos = [];
    }

    async getProductos(req){
        try {
            if (!req.params.pid) {
                this.productos = await manejadorArhcivos.getAll()
                return this.productos
            } else {
                const producto = await manejadorArhcivos.getById(req.params.pid)
                return producto
            }
        } catch (error) {
            return {error: error}
        }
        /*Para ser usado sólo con DB*/
        // try {
        //     if (!req.params.id) {
        //         this.productos = await obtenerProductos()
        //         return this.productos
        //     } else {
        //         const producto = await obtenerProductoPorID(req.params.id)
        //         if (producto == false){
        //             return {error: "El id ingresado no corresponde a un producto"}
        //         } else return producto
        //     }
        // } catch (error) {
        //     return {error: error}
        // }
    }

    async createProducto(req){
        try {
            let {nombre, descripcion, codigo, urlFoto, precio, stock} = req.body
            const nuevoProducto = new Producto(nombre, descripcion, codigo, urlFoto, precio, stock)
            await manejadorArhcivos.create(nuevoProducto)
            const productos = await manejadorArhcivos.getAll()
            return productos
        } catch (error) {
            return {error: error}
        }
        /*Para ser usado sólo con DB*/
        // try {
        //     let {nombre, descripcion, codigo, urlFoto, precio, stock} = req.body
        //     const nuevoProducto = new Producto(nombre, descripcion, codigo, urlFoto, precio, stock)
        //     await crearProducto(nuevoProducto)
        //     const productos = await obtenerProductos()
        //     return productos
        // } catch (error) {
        //     return {error: error}
        // }
    }

    async deleteProducto(req){
        try {
            await manejadorArhcivos.delete(req.params.pid)
            const productos = await manejadorArhcivos.getAll()
            return productos
        } catch (error) {
            return {error: error}
        }
        /*Para ser usado sólo con DB*/
        // try {
        //     await borrarProducto(req.params.id)
        //     const productos = await obtenerProductos()
        //     return productos
        // } catch (error) {
        //     return {error: error}
        // }
    }

    async modifyProducto(req){
        try {
            await manejadorArhcivos.modify(req.body._id, req.body)
            const productos = await manejadorArhcivos.getAll()
            return productos
        } catch (error) {
            return {error: error}
        }
        /*Para ser usado sólo con DB*/
        // try {
        //     await modificarProducto(req.body._id, req.body)
        //     const productos = await obtenerProductos()
        //     return productos
        // } catch (error) {
        //     return {error: error}
        // }
    }
}

module.exports = new ProductosServices();