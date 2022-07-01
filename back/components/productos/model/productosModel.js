let { Schema, model } = require("mongoose");
// let { mongoose, conectarMongo } = require("../../../daos/mongodb")
//     conectarMongo()
let { crearProductoSchema } = require("../schema/productosSchema")
const productoSchema = new Schema(crearProductoSchema)
const productoModel = model("producto", productoSchema)
const logger = require("../../../utils/loggers/winston")

const crearProducto = async ({timestamp, nombre, descripcion, codigo, urlFoto, precio, stock, addedToCart}) => {
    let producto = { timestamp, nombre, descripcion, codigo, urlFoto, precio, stock, addedToCart}

    try {
        await productoModel.create(producto)
    } catch (error) {
        logger.error(error)
    }
}

const modificarProducto = async (id, data) => {
    try {
        await productoModel.updateOne({_id: id}, {...data}, async (err,res) => {
            if (err){
                logger.error("ERROR EN UPDATE:", err)
            } else{
                logger.debug("UPDATE OK")
            }
        })
    } catch (error) {
        logger.error(error)
    }
}

const obtenerProductos = async () => {
    try {
        const productos = await productoModel.find({})
        return productos
    } catch (error) {
        logger.error(error)
    }
}

const obtenerProductoPorID = async (_id) => {
    try {
        const producto = await productoModel.findOne({_id: _id})
        return producto
    } catch (error) {
        logger.error(error)
    }
}

const borrarProducto = async (id) => {
    try {
        const query = await productoModel.findOneAndDelete({_id: id})
        return query
    } catch (error) {
        logger.error(error)
    }
}

module.exports = { 
    crearProducto, 
    modificarProducto, 
    obtenerProductos,
    obtenerProductoPorID,
    borrarProducto 
}