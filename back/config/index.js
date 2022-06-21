const dotenv = require('dotenv').config();

let config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 8080,
  CORS: process.env.CORS || 'http://localhost:3000',
  MONGO_ATLAS_URI_USUARIOS: process.env.MONGO_ATLAS_URI_USUARIOS,
  SECRET_KEY: process.env.SECRET_KEY,
  FRONT_URI: process.env.FRONT_URI,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  DB_NAME: process.env.DB_NAME,
  SERVER_MODE: process.env.SERVER_MODE,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}

module.exports = { config };