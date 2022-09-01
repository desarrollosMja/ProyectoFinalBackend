const mongoose = require("mongoose")
const { Schema } = mongoose

module.exports = new Schema({
    nombre: String,
    edad: Number,
    email: String,
    password: String,
    direccion: String,
    prefijo: Number,
    telefono: Number,
    foto: String,
    administrador: Boolean
})