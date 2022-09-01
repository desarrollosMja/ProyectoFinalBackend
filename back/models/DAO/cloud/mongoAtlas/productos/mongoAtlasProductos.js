const { MongoClient } = require("mongodb");
const { config } = require("../../../../../config")

const url = config.MONGO_ATLAS_URI_PRODUCTOS;
const clientProductos = new MongoClient(url);
const dbNameProductos = "Productos";

module.exports = { clientProductos , dbNameProductos };