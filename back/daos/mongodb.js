const { config } = require("../config")
const logger = require("../utils/loggers/winston")
let mongoose = require('mongoose')
const MONGO_DB = config.MONGO_DB_URI || "mongodb://localhost:27017/"
const DB_NAME = config.DB_NAME || "tienda"

let connection = null;

const conectarMongo = async () => {
    try {
        connection = await mongoose.connect(`${MONGO_DB}${DB_NAME}`)
        logger.debug("Conexión con Mongo establecida con éxito!")
    } catch (error) {
        logger.error(error)
    }
}

module.exports = { connection, mongoose, conectarMongo }