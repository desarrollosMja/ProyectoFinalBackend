const CarritosServices = require('../services/carritosServices');
const { v4: uuidv4 } = require('uuid');

class CarritosController{

    async createCarrito(req, res, next){
        try {
            const idCarrito = uuidv4();
            await CarritosServices.createCarrito(req.body, idCarrito);
            res.json({idCarrito: idCarrito});
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