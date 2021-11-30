var admin = require("firebase-admin");

var serviceAccount = require("./ecommerce-carrito-firebase-adminsdk-vylnp-1879cf1249.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

module.exports = { db }