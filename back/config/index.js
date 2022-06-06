const dotenv = require('dotenv').config();

let config = {

  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 8080,
  CORS: process.env.CORS || 'http://localhost:3000',
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  FRONT_URI: process.env.FRONT_URI
}

module.exports = { config };