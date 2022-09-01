const Usuario = require("../usuarios")
let bcrypt = require("bcryptjs")
const { generateToken } = require("../../../utils/JWT")
const { nodemailerTransporter } = require("../../../utils/nodemailer")
const logger = require("../../../utils/loggers/winston")
const { config } = require("../../../config")
const daosFactory = require("../../../models/daoFactory.js")

class UsuariosServices{

    async getUsuario(req){
        try {
            const usuario = await daosFactory.getUserByEmail(req.body.email)
            if (usuario == null) return undefined
            const check_pass = bcrypt.compareSync(req.body.password, usuario.password)
            if (check_pass == false) return undefined
            return usuario
        } catch (error) {
            return {error: error}
        }
    }

    async getByEmail(email){
        try {
            return daosFactory.getUserByEmail(email)
        } catch (error) {
            return {error: error}
        }
    }

    async createUsuario(req){
        try {
            //Guardado del usuario en la DB y creación del token
            let {nombre, edad, email, password, direccion, prefijo, telefono, foto, tipoUsuario} = req.body
            let hash = bcrypt.hashSync(password, 8);
            const administrador = tipoUsuario == "si" ? true : false
            const nuevoUsuario = new Usuario(nombre, edad, email, hash, direccion, prefijo, telefono, foto, administrador)
            await daosFactory.setNewUser(nuevoUsuario);

            const user = { nombre, edad, email, password, direccion, prefijo, telefono, foto, tipoUsuario }
            const access_token = generateToken(user)
            logger.debug(`Usuario creado con éxito. USER: ${JSON.stringify(user)}`)

            //Envío de email al administrador con datos del nuevo usuario
            await nodemailerTransporter.sendMail({
                from: "Ecommerce",
                to: config.EMAIL_ADDRESS,
                subject: `Nuevo registro de usuario`,
                html: `
                    <ul>
                        <li style="list-style: none"><b>Nombre:</b> ${nombre}</li>
                        <li style="list-style: none"><b>Edad:</b> ${edad}</li>
                        <li style="list-style: none"><b>Email:</b> ${email}</li>
                        <li style="list-style: none"><b>Dirección:</b> ${direccion}</li>
                        <li style="list-style: none"><b>Prefijo telefónico:</b> ${prefijo}</li>
                        <li style="list-style: none"><b>Teléfono:</b> ${telefono}</li>
                        <li style="list-style: none"><b>Avatar:</b> ${foto}</li>
                        <li style="list-style: none"><b>Tipo de Usuario:</b> ${tipoUsuario}</li>
                    </ul>
                `
            })

            return {token: access_token, user: user}
        } catch (error) {
            return {error: error}
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