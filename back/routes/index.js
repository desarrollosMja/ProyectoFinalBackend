let productos = require("../components/productos")
let carritos = require("../components/carritos")

module.exports = (app) => {
    productos(app)
    carritos(app)
}
