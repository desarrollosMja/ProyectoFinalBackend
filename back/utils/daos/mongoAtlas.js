const { MongoClient } = require("mongodb");
require("dotenv").config()

const url = process.env.MONGO_ATLAS_URI;
const client = new MongoClient(url);
const dbName = "Usuarios";


module.exports = { client, dbName };