let UsuariosServices = require("../services/usuariosService")

class UsuariosController {

    async getUsuario(req, res, next) {
        try {
            let usuario = await UsuariosServices.getUsuario(req)
            req.session.userName = usuario.nombre
            res.json(usuario)
        } catch (error) {
            next(error)
        }
    }

    async createUsuario(req, res, next){
        try {
            const usuario = await UsuariosServices.createUsuario(req)
            req.session.userName = usuario.nombre
            res.json(usuario)
        } catch (error) {
            res.json({ERROR: "No tiene autorización para acceder a esta ruta"})
            next(error)
        }
    }

    async guardarFoto(req, res, next){
        try {
            const foto = await UsuariosServices.guardarFoto(req, res, next)
            res.send(foto)
        } catch (error) {
            console.log("Error en Usuarios Controler: ", error)       
        }
    }

    async getSession(req,res,next){
        try {
            const session = await UsuariosServices.getSession(req,res)
            res.json(session)
        } catch (error) {
            next(error)
        }
    }
    // async deleteProducto(req, res, next){
    //     try {
    //         const productos = await ProductosServices.deleteProducto(req)
    //         res.send(productos)
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    // async modifyProducto(req, res, next){
    //     try {
    //         const respuesta = await ProductosServices.modifyProducto(req)
    //         console.log("UPDATE:", respuesta)
    //         res.send(respuesta)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}

module.exports = new UsuariosController();