require("dotenv").config()
const session = require("express-session")
const MongoStore = require("connect-mongo")
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
const { v4: uuidv4 } = require('uuid');

module.exports = session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS_URI,
        advancedOptions
    }),
    secret: "Ahhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60
    },
    rolling: true,
    genid: function(req){
        return uuidv4()
    }
})