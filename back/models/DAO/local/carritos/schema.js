const mongoose = require("mongoose")
const { Schema } = mongoose

const itemSchema = new Schema({
    nombre: String,
    descripcion: String,
    codigo: Number,
    urlFoto: String,
    precio: Number,
    stock: Number,
    addedToCart: Number
})

module.exports = new Schema({
    item: [itemSchema]
})