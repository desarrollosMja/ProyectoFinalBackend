const { MongoClient } = require("mongodb");
const { config } = require("../../../../../config")

const url = config.MONGO_ATLAS_URI_CARRITOS;
const clientCarritos = new MongoClient(url);
const dbNameCarritos = "Carritos";

module.exports = { clientCarritos , dbNameCarritos };