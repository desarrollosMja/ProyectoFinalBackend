let ProductosServices = require("../services/productosService")

class ProductosController {

    async getProductos(req, res, next) {
        try {
            let productos = await ProductosServices.getProductos(req)
            res.send(productos)
        } catch (error) {
            next(error)
        }
    }

    async createProducto(req, res, next){
        try {
            let producto = await ProductosServices.createProducto(req)
            res.redirect("http://localhost:3000/productos")
            //res.send({mensaje: "Producto cargado con éxito", productos: producto})
        } catch (error) {
            next(error)
        }
    }

    async deleteProducto(req, res, next){
        try {
            const respuesta = await ProductosServices.deleteProducto(req)
            if (respuesta != false){
                res.send({mensaje: "Producto eliminado con éxito", productos: respuesta})
            } else res.send({mensaje: "No se pudo realizar la operación porque el ID no coincide con ningún producto cargado"})
        } catch (error) {
            next(error)
        }
    }

    async modifyProducto(req, res, next){
        console.log("entré")
        try {
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductosController();