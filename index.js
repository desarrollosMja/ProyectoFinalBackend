const express = require("express")
const app = express()
const cors = require("cors")
const config = require("./config")
const serverRoutesProductos = require("./routes")
const serverRoutesCarrito = require("./routes")
const PORT = process.env.PORT || "8080"

app.use(express.json())
app.use(cors("*"))
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

serverRoutesProductos(app)
serverRoutesCarrito(app)