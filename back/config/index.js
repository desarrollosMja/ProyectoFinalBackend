const dotenv = require('dotenv').config();

let config = {

  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 8080,
  CORS: process.env.CORS || '*'

}

module.exports = { config };