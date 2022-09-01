let UsuariosServices = require("../services/usuariosService")
const logger = require("../../../utils/loggers/winston")
const { generateToken } = require("../../../utils/JWT")

class UsuariosController {

    async getUsuario(req, res, next) {
        try {
            const user = await UsuariosServices.getUsuario(req)
            
            //Si el usuario no existe o su contraseña es incorrecta, se devuelve un token nulo
            if (user == undefined) {
                logger.warn(`El usuario no existe o la contraseña es incorrecta. USER: ${req.body}`)
                return res.json({token: null})
            }

            //Si el usuario existe, se devuelve junto con un nuevo token
            const access_token = generateToken(user)
            logger.debug(`Acceso exitoso. USER: ${JSON.stringify(user)}`)
            res.json({token: access_token, user: user})
        } catch (error) {
            res.json({error: error})
        }
    }

    async getByEmail(req,res){
        try {
            let usuario = await UsuariosServices.getByEmail(req.body.email)
            if (!usuario) return {existe: false}
            return {existe: true, usuario: usuario}
        } catch (error) {
            res.json({session: false})
        }
    }

    async createUsuario(req, res, next){
        try {
            //Comprobación si el usuario existe ya o no
            let usuario = await UsuariosServices.getByEmail(req.body.email)
            if (usuario) {
                logger.warn(`El usuario ya existe. USER: ${usuario}`)
                return res.json({error: "El usuario ya existe!"})
            }

            //Si no existe se lo crea y se lo devuelve junto con le token
            const user_obj = await UsuariosServices.createUsuario(req)
            res.json({token: user_obj.token, user: user_obj.user})
        } catch (error) {
            res.json({ERROR: "No tiene autorización para acceder a esta ruta"})
        }
    }

    async guardarFoto(req, res, next){
        try {
            const foto = await UsuariosServices.guardarFoto(req, res, next)
            res.send(foto)
        } catch (error) {
            res.json({error: error})      
        }
    }

    async verifyToken(req,res,next){
        try {
            logger.debug(`Token verificado con éxito. Ruta: ${req.path}`)
            res.json({session: true, 
                  user: {
                    id: req.user._id, 
                    nombre: req.user.nombre, 
                    email: req.user.email, 
                    foto: req.user.foto, 
                    administrador: req.user.administrador, 
                    prefijo: req.user.prefijo, 
                    telefono: req.user.telefono
                  }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UsuariosController();