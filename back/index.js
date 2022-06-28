const express = require("express")
const app = express()
const cors = require("cors")
const { config } = require("./config")
const path = require("path")
const cluster = require("cluster")
const cpus = require("os").cpus().length
const serverRoutes = require("./routes")
const logger = require("./utils/loggers/winston")

app.use(express.json())
app.use(cors(`${config.CORS}`))
app.use(express.urlencoded({extended: true}))
app.use("/public", express.static(path.join(__dirname,"/public")))

if (config.SERVER_MODE == "cluster"){
    if (cluster.isMaster){
        logger.silly(`Master server on PORT ${config.PORT} with PID ${process.pid}`)
        for (let i = 0; i < cpus; i++) {
            cluster.fork()
        }
        cluster.on("exit", (worker, code, signal) => {
            logger.silly(`Worker ${worker.process.pid} died!`)
            cluster.fork()
        })
    } else {
        app.listen(config.PORT, () => logger.silly(`Worker on http://localhost:${config.PORT} - Worker PID: ${process.pid}`))
    }
} else if (config.SERVER_MODE == "fork"){
    app.listen(config.PORT, () => logger.silly(`Fork server on http://localhost:${config.PORT}`, " - Process PID: ", process.pid))
} else {
    logger.debug("No ha ingresado un modo de ejecución de servidor válido (FORK o CLUSTER)")
    process.exit()
}

serverRoutes(app)
