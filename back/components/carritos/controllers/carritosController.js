const CarritosServices = require('../services/carritosServices')
const { nodemailerTransporter } = require("../../../utils/nodemailer")
const { config } = require("../../../config")
const logger = require("../../../utils/loggers/winston")
const { sendPedidoCreado, sendConfirmacionAdministrador } = require("../../../utils/Twilio")

class CarritosController{

    async createCarrito(req, res, next){
        try {
            const idCarritoNuevo = await CarritosServices.createCarrito(req.body);
            res.json({idCarrito: idCarritoNuevo});
        } catch (error) {
            res.json({error: error})
        }
    }   

    async addProducto(req, res, next){
        try {
            await CarritosServices.addProducto(req);
        } catch (error) {
            res.json({error: error})
        }
    }

    async addUnidad(req, res, next){
        try {
            await CarritosServices.addUnidad(req);
        } catch (error) {
            res.json({error: error})
        }
    }

    async deleteProducto(req, res, next){
        try {
            await CarritosServices.deleteProducto(req);
        } catch (error) {
            res.json({error: error})
        }
    }

    async deleteCarrito(req, res, next){
        try {
            await CarritosServices.deleteCarrito(req);
        } catch (error) {
            res.json({error: error})
        }
    }

    async getCarrito(req, res, next){
        try {
            const carrito = await CarritosServices.getCarrito(req);
            res.json(carrito);
        } catch (error) {
            res.json({error: error})
        }
    }

    async newOperation(req,res,next){
        try {
            const lista = req.body.carrito.map(producto => {
                return `<h3 style="text-decoration: underline;color: red">${producto.item.nombre}</h3>
                        <ul>
                            <li style="list-style: none">Precio: ${producto.item.precio}</li>
                            <li style="list-style: none">Unidades compradas: ${producto.item.addedToCart}</li>
                        </ul>`
            })
    
            const info = await nodemailerTransporter.sendMail({
                from: "Ecommerce",
                to: config.EMAIL_ADDRESS,
                subject: `Nueva orden de compra de ${req.body.user.nombre} - Email: ${req.body.user.email}`,
                html: `
                    <h1>Orden de compra #</h1><hr/>
                    <span>${lista}</span><hr/>
                    <h2>Total de la compra: $ ${req.body.total}</h2>
                `
            })
            logger.debug(info)
            if (info.accepted.length > 0) {
                sendPedidoCreado(req.body.user.telefono)
                sendConfirmacionAdministrador({
                    user: {
                        nombre: req.body.user.nombre, 
                        email: req.body.user.email
                    },
                    carrito: req.body.carrito,
                    total: req.body.total
                })
                return res.json({success: true})
            }
            res.json({success: false})
        } catch (error) {
            res.json({error: error})
        }
    }
}

module.exports = new CarritosController();