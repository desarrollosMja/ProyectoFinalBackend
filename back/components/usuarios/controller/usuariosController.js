let UsuariosServices = require("../services/usuariosService")

class UsuariosController {

    async getUsuario(req, res, next) {
        try {
            let usuario = await UsuariosServices.getUsuario(req)
            return usuario
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
            const usuario = await UsuariosServices.createUsuario(req)
            return usuario
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
}

module.exports = new UsuariosController();