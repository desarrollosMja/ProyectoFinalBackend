const mongoose = require("mongoose")
const { Schema } = mongoose

module.exports = new Schema({
    nombre: String,
    descripcion: String,
    codigo: Number,
    urlFoto: String,
    precio: Number,
    stock: Number,
    addedToCart: Number
})