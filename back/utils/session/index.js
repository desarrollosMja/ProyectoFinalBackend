require("dotenv").config()
const session = require("express-session")
const MongoStore = require("connect-mongo")
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}

module.exports = session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS_URI,
        advancedOptions
    }),
    secret: "Ahhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60
    },
    rolling: true
})