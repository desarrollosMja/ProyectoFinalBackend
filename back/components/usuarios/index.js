const { Router } = require("express")
const router = Router()
const upload = require("../../utils/middlewares/multer")
let UsuariosController = require("./controller/usuariosController")

module.exports = (app) => {
    app.use("/api/usuarios", router)
    
    router.post("/nuevo", UsuariosController.createUsuario)

    router.post("/guardar-foto", upload.single("foto"), UsuariosController.guardarFoto)

    router.post("/", UsuariosController.getUsuario)

    router.get("/session", UsuariosController.getSession)
}
