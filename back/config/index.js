const dotenv = require('dotenv').config();
const args = require("minimist")(process.argv.slice(2))

let config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 8080,
  FRONT_PORT: process.env.FRONT_PORT || 3000,
  CORS: process.env.CORS || 'http://localhost:3000',
  MONGO_ATLAS_URI_USUARIOS: process.env.MONGO_ATLAS_URI_USUARIOS,
  SECRET_KEY: process.env.SECRET_KEY,
  FRONT_URI: process.env.FRONT_URI,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  MONGO_ATLAS_URI_PRODUCTOS: process.env.MONGO_ATLAS_URI_PRODUCTOS,
  DB_NAME: process.env.DB_NAME,
  SERVER_MODE: args.mode || "fork",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGING_SERVICE_SID: process.env.TWILIO_MESSAGING_SERVICE_SID,
  TWILIO_ADMINISTRATOR_PHONE_NUMBER: process.env.TWILIO_ADMINISTRATOR_PHONE_NUMBER,
  TWILIO_USA_PHONE: process.env.TWILIO_USA_PHONE
}

module.exports = { config };