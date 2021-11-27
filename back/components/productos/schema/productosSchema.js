const Joi = require("joi")

const timestamp = Joi.number().integer()
const nombre = Joi.string().min(3)
const descripcion = Joi.string().min(40)
const codigo = Joi.number().integer().min(3)
const urlFoto = Joi.string()
const precio = Joi.number()
const stock = Joi.number().integer()
const addedToCart = Joi.number().integer()

const crearProductoSchema = {
    timestamp: timestamp.required(),
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    codigo: codigo.required(),
    urlFoto: urlFoto.required(),
    precio: precio.required(),
    stock: stock.required(),
    addedToCart: addedToCart.required()
}

module.exports = { crearProductoSchema }