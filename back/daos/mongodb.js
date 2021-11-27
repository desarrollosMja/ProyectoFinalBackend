require("dotenv").config()
let mongoose = require('mongoose');
const MONGO_DB = process.env.MONGO_DB_URI || "mongodb://localhost:27017/"
const DB_NAME = process.env.DB_NAME || "tienda"

// class MongoConnection{
//     static instancia
//     constructor(){
//         if (MongoConnection.instancia){
//             this.instancia = MongoConnection.instancia
//             return this
//         }
//         MongoConnection.instancia = mongoose.connect(`${MONGO_DB}${DB_NAME}`)
//         this.instancia = MongoConnection.instancia
//     }
// }

// module.exports = { MongoConnection, mongoose }

let connection = null;

const conectarMongo = async () => {
    try {
        connection = await mongoose.connect(`${MONGO_DB}${DB_NAME}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connection, mongoose, conectarMongo }