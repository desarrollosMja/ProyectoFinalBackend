function login(req,res,next){
    const {administrador} = req.body
    if(administrador){
        next()
    } else{
        res.send({error: "No tienes permisos para realizar esta acción"})
    }
}

module.exports = login