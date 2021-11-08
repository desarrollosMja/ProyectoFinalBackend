const express = require("express")
const app = express()
const cors = require("cors")
const { config } = require("./config")
const path = require("path")
const serverRoutes = require("./routes")
const PORT = config.PORT || "8080"

app.use(express.json())
app.use(cors(`${config.CORS}`))
app.use(express.urlencoded({extended: true}))
app.use("/", express.static("views"))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

serverRoutes(app)
