const Producto = require("../productos")
const Manejador = require("../../manejadores/manejadorArchivo")
const manejador = new Manejador("productos.txt")

class ProductosServices{
    constructor(){
        this.productos = [];
    }

    async getProductos(req){
        try {
            if (!req.params.id) {
                this.productos = await manejador.getAll()
                return this.productos
            } else {
                const producto = await manejador.getById(req.params.id)
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
            let id
            this.productos = await manejador.getAll()
            this.productos.length != 0 ? (id = this.productos[this.productos.length - 1].id + 1) : id = 1
            this.productos.push(new Producto(id, nombre, descripcion, codigo, urlFoto, precio, stock))
            manejador.save(this.productos)
            return this.productos
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
            this.productos = await manejador.getAll()
            for (const producto of this.productos) {
                if (producto.id == req.body.id) {
                    producto.nombre = req.body.nombre
                    producto.descripcion = req.body.descripcion
                    producto.codigo = req.body.codigo
                    producto.urlFoto = req.body.urlFoto
                    producto.precio = req.body.precio
                    producto.stock = req.body.stock
                }
            }
            await manejador.save(this.productos)
            return this.productos
        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = new ProductosServices();