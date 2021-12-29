let productos = require("../components/productos")
let carritos = require("../components/carritos")
let usuarios = require("../components/usuarios")

module.exports = (app) => {
    productos(app)
    carritos(app)
    usuarios(app)
}
