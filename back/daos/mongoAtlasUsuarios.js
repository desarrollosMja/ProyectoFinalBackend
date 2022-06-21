const { MongoClient } = require("mongodb");
const { config } = require("../config")

const url = config.MONGO_ATLAS_URI_USUARIOS;
const client = new MongoClient(url);
const dbName = "Usuarios";

module.exports = { client, dbName };