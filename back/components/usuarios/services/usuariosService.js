const Usuario = require("../usuarios")
const { client, dbName } = require("../../../utils/daos/mongoAtlas")

class UsuariosServices{

    async getUsuario(req){
        try {
            await client.connect();
            const db = client.db(dbName);

            const col = db.collection("usuarios");
            const usuario = await col.findOne({email: req.body.email, password: req.body.password})
            return usuario
        } catch (error) {
            return {error: error}
        }

        finally {
            await client.close()
        }
    }

    async createUsuario(req){
        try {
            await client.connect();
            const db = client.db(dbName);

            const col = db.collection("usuarios");

            let {nombre, edad, email, password, direccion, telefono, foto, tipoUsuario} = req.body
            const administrador = tipoUsuario == "si" ? true : false
            const nuevoUsuario = new Usuario(nombre, edad, email, password, direccion, telefono, foto, administrador)
            const nuevoIngreso = await col.insertOne(nuevoUsuario);

            return nuevoUsuario
        } catch (error) {
            return {error: error}
        }

        finally {
            await client.close()
        }
    }

    async guardarFoto(req, res, next){
        try {
            const file = req.file
            if (!file){
                const error = new Error("Please upload a file")
                error.httpStatusCode = 400
                return next(error)
            }
            return file
        } catch (error) {
            console.log("Error en Usuarios Services", error)
        }
    }

    async getSession(req,res){
        try {
            if (req.session.userName){
                return req.session.userName
            }else{
                return null
            }
        } catch (error) {
            return {error: error}
        }
    }

    // async deleteProducto(req){
    //     try {
    //         await borrarProducto(req.params.id)
    //         const productos = await obtenerProductos()
    //         return productos
    //     } catch (error) {
    //         return {error: error}
    //     }
    // }

    // async modifyProducto(req){
    //     try {
    //         await modificarProducto(req.body._id, req.body)
    //         const productos = await obtenerProductos()
    //         return productos
    //     } catch (error) {
    //         return {error: error}
    //     }
    // }
}

module.exports = new UsuariosServices();