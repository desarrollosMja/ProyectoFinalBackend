const CarritosServices = require('../services/carritosServices');

class CarritosController{

    async createCarrito(req, res, next){
        try {
            const idCarritoNuevo = await CarritosServices.createCarrito(req.body);
            res.json({idCarrito: idCarritoNuevo});
        } catch (error) {
            next(error);
        }
    }   

    async addProducto(req, res, next){
        try {
            await CarritosServices.addProducto(req);
        } catch (error) {
            next(error);
        }
    }

    async addUnidad(req, res, next){
        try {
            await CarritosServices.addUnidad(req);
        } catch (error) {
            next(error);
        }
    }

    async deleteProducto(req, res, next){
        try {
            await CarritosServices.deleteProducto(req);
        } catch (error) {
            next(error);
        }
    }

    async deleteCarrito(req, res, next){
        try {
            await CarritosServices.deleteCarrito(req);
        } catch (error) {
            next(error);
        }
    }

    async getCarrito(req, res, next){
        try {
            const carrito = await CarritosServices.getCarrito(req);
            res.json(carrito);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CarritosController();