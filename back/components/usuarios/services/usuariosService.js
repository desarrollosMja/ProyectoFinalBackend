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

    async getByEmail(email){
        try {
            await client.connect();
            const db = client.db(dbName);
            const col = db.collection("usuarios");
            return await col.findOne({email: email})
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

            let {nombre, edad, email, password, direccion, prefijo, telefono, foto, tipoUsuario} = req.body
            const administrador = tipoUsuario == "si" ? true : false
            console.log(foto)
            const nuevoUsuario = new Usuario(nombre, edad, email, password, direccion, prefijo, telefono, foto, administrador)
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

    async checkUsuario(email){
        try {
            await client.connect();
            const db = client.db(dbName);
            const col = db.collection("usuarios");
            const usuario = await col.findOne({email: email})
            return usuario
        } catch (error) {
            return {error: error}
        }

        finally {
            await client.close()
        }
    }
}

module.exports = new UsuariosServices();