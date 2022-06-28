let ProductosServices = require("../services/productosService")
const { config } = require("../../../config")

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
            const productos = await ProductosServices.createProducto(req)
            res.redirect(`http://localhost:${config.FRONT_PORT}/productos`)
        } catch (error) {
            next(error)
        }
    }

    async deleteProducto(req, res, next){
        try {
            const productos = await ProductosServices.deleteProducto(req)
            res.send(productos)
        } catch (error) {
            next(error)
        }
    }

    async modifyProducto(req, res, next){
        try {
            const respuesta = await ProductosServices.modifyProducto(req)
            res.send(respuesta)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductosController();