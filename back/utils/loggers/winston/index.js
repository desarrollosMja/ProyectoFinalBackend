const winston = require("winston")

const logger = winston.createLogger({
    level: "silly",
    transports:[
        new winston.transports.Console({level: "silly"}),
        new winston.transports.File({level: "warn", filename: "warn.log"})
    ]
})

module.exports = logger