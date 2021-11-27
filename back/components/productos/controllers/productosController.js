let ProductosServices = require("../services/productosService")

class ProductosController {

    async getProductos(req, res, next) {
        try {
            let productos = await ProductosServices.getProductos(req)
            console.log(productos)
            res.send(productos)
        } catch (error) {
            next(error)
        }
    }

    async createProducto(req, res, next){
        try {
            let producto = await ProductosServices.createProducto(req)
            res.redirect("http://localhost:3000/productos")
        } catch (error) {
            res.json({ERROR: "No tiene autorización para acceder a esta ruta"})
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
        try {
            const respuesta = await ProductosServices.modifyProducto(req)
            console.log("UPDATE:", respuesta)
            res.send(respuesta)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductosController();