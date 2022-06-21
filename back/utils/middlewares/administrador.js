const logger = require("../loggers/winston")

function login(req,res,next){
    const {administrador} = req.body
    if(administrador){
        next()
    } else{
        logger.warn(`Acceso no autorizado. User: ${req.body}`)
        res.send({error: "No tienes permisos para realizar esta acción"})
    }
}

module.exports = login