const Usuario = require("../usuarios")
const { client, dbName } = require("../../../daos/mongoAtlasUsuarios")
let bcrypt = require("bcryptjs")

class UsuariosServices{

    async getUsuario(req){
        try {
            await client.connect();
            const db = client.db(dbName);
            const col = db.collection("usuarios");
            const usuario = await col.findOne({email: req.body.email})
            if (usuario == null) return undefined
            const check_pass = bcrypt.compareSync(req.body.password, usuario.password)
            if (check_pass == false) return undefined
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
            let hash = bcrypt.hashSync(password, 8);
            const administrador = tipoUsuario == "si" ? true : false
            const nuevoUsuario = new Usuario(nombre, edad, email, hash, direccion, prefijo, telefono, foto, administrador)
            await col.insertOne(nuevoUsuario);
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
            return {error: error}
        }
    }
}

module.exports = new UsuariosServices();