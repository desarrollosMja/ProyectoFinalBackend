const { Router } = require("express")
const router = Router()
const upload = require("../../utils/middlewares/multer")
let UsuariosController = require("./controller/usuariosController")
const { generateToken, auth } = require("../../utils/JWT")
const logger = require("../../utils/loggers/winston")

module.exports = (app) => {
    app.use("/api/usuarios", router)

    //rutas GET
    router.get("/verify-token", auth, (req,res,next) => {
        logger.debug(`Token verificado con éxito. Ruta: ${req.path}`)
        res.json({session: true, user: {id: req.user._id, nombre: req.user.nombre, foto: req.user.foto, administrador: req.user.administrador}})
    })

    //rutas POST
    router.post("/guardar-foto", upload.single("foto"), UsuariosController.guardarFoto)

    router.post("/nuevo", async (req,res,next) => {
        const { nombre, edad, email, password, direccion, prefijo, telefono, foto, tipoUsuario } = req.body

        const usuario = await UsuariosController.getByEmail(req,res)
        if (usuario.existe == true) {
            logger.warn(`El usuario ya existe. USER: ${usuario}`)
            return res.json({error: "El usuario ya existe!"})
        }

        await UsuariosController.createUsuario(req,res,next)

        const user = { nombre, edad, email, password, direccion, prefijo, telefono, foto, tipoUsuario }
        const access_token = generateToken(user)
        logger.debug(`Usuario creado con éxito. USER: ${JSON.stringify(user)}`)
        res.json({token: access_token, user: user})
    });

    router.post("/", async (req,res,next) => {       
        const user = await UsuariosController.getUsuario(req,res,next)
        if (!user) {
            logger.warn(`El usuario no existe. USER: ${req.body}`)
            return res.json({token: null})
        }

        const access_token = generateToken(user)
        logger.debug(`Acceso exitoso. USER: ${JSON.stringify(user)}`)
        res.json({token: access_token, user: user})
    });
}
