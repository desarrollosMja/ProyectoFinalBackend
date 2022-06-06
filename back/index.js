const express = require("express")
const app = express()
const cors = require("cors")
const { config } = require("./config")
const path = require("path")
const serverRoutes = require("./routes")
const PORT = config.PORT || "8080"
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const initializePassport = require("./components/usuarios/passport-config.js")
    initializePassport(passport)

app.use(express.json())
app.use(cors(`${config.CORS}`))
app.use(express.urlencoded({extended: true}))
app.use("/", express.static("views"))
app.use("/public", express.static("public"))
app.use(session({
    secret: config.SECRET_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 1000 * 60
    },
    rolling: true
}))

// Initializing Passport
app.use(passport.initialize())

// Starting the session
app.use(passport.session())

app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs")
app.set('trust proxy', 1)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`, " - Process PID: ", process.pid))

serverRoutes(app,passport)

app.get("*", (req, res)=>{
    res.status(404).send(`Error: -2 ruta: ${req.path}, metodo: ${req.method}, no implementada`)
})
