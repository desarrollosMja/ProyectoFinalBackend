let productos = require("../components/productos")
let carritos = require("../components/carritos")
let usuarios = require("../components/usuarios")
const logger = require("../utils/loggers/winston")

module.exports = (app) => {
    productos(app)
    carritos(app)
    usuarios(app)

    app.get('/favicon.ico', (req, res) => res.status(204).end());

    app.get("*", (req, res)=>{
        logger.error(`Ruta inválida: ${req.path}, metodo: ${req.method}`)
        res.status(404).send(`Error: -2 ruta: ${req.path}, metodo: ${req.method}, no implementada`)
    })    
}
