let { Schema, model } = require("mongoose");
let { mongoose, conectarMongo } = require("../../../utils/daos/mongodb")
let { crearProductoSchema } = require("../schema/productosSchema")
const productoSchema = new Schema(crearProductoSchema)
const productoModel = model("producto", productoSchema)

const crearProducto = async ({timestamp, nombre, descripcion, codigo, urlFoto, precio, stock, addedToCart}) => {
    let producto = { timestamp, nombre, descripcion, codigo, urlFoto, precio, stock, addedToCart}

    try {
        const nuevoProducto = await productoModel.create(producto)
    } catch (error) {
        console.log(error)
    }
}

const modificarProducto = async (id, data) => {
    try {
        await productoModel.updateOne({_id: id}, {...data}, async (err,res) => {
            if (err){
                console.log("ERROR EN UPDATE:", err)
            } else{
                console.log("UPDATE OK")
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const obtenerProductos = async () => {
    try {
        conectarMongo()
        const productos = await productoModel.find({})
        return productos
    } catch (error) {
        console.log(error)
    }
}

const obtenerProductoPorID = async (_id) => {
    try {
        console.log("Obtener producto por ID")
        const producto = await productoModel.findOne({_id: _id})
        return producto
    } catch (error) {
        console.log(error)
    }
}

const borrarProducto = async (id) => {
    try {
        const query = await productoModel.findOneAndDelete({_id: id})
        console.log(query)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { 
    crearProducto, 
    modificarProducto, 
    obtenerProductos,
    obtenerProductoPorID,
    borrarProducto 
}