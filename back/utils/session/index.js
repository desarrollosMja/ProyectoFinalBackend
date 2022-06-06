const { config } = require("../../config/index")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
const { v4: uuidv4 } = require('uuid');

module.exports = session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URI,
        advancedOptions
    }),
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60
    },
    rolling: true,
    genid: function(req){
        return uuidv4()
    }
})