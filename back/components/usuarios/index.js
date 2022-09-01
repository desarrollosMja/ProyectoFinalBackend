const { Router } = require("express")
const router = Router()
const upload = require("../../utils/middlewares/multer")
let UsuariosController = require("./controller/usuariosController")
const { auth } = require("../../utils/JWT")

module.exports = (app) => {
    app.use("/api/usuarios", router)

    //rutas GET
    router.get("/verify-token", auth, UsuariosController.verifyToken)

    //rutas POST
    router.post("/guardar-foto", upload.single("foto"), UsuariosController.guardarFoto)

    router.post("/nuevo", UsuariosController.createUsuario);

    router.post("/", UsuariosController.getUsuario);
}
