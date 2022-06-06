const { Router } = require("express")
const router = Router()
const upload = require("../../utils/middlewares/multer")
let UsuariosController = require("./controller/usuariosController")
const textUsuarioYaRegistrado = "Email ya registrado!"
const textUsuarioInexistente = "Datos incorrectos!"

let isLogin = (req, res, next)=>{
    try {
        console.log(req.session)
        if(req.isAuthenticated()){
            next()
        }else{
            res.json({session: false})
        }
    } catch (error) {
        console.log(error)
    }
}

let isNotLogin = (req, res, next)=>{
    try {
        if(!req.isAuthenticated()){
            next()
        }else{
            res.redirect(`${config.FRONT_URI}/productos`)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = (app,passport) => {
    app.use("/api/usuarios", router)
    
    //router.post("/nuevo", UsuariosController.createUsuario)

    router.post("/guardar-foto", upload.single("foto"), UsuariosController.guardarFoto)

    //router.post("/", UsuariosController.getUsuario)

    router.post("/nuevo",  passport.authenticate('register', {failureRedirect:`/api/usuarios/error/${textUsuarioYaRegistrado}`}), (req,res,next) => {
        res.json(req.body)
    });

    router.post("/", passport.authenticate('login', {failureRedirect:`/api/usuarios/error/${textUsuarioInexistente}`}), (req,res,next) => {       
        res.json(req.user)
    });

    router.get("/error/:errorMessage", (req,res,next) => {
        res.render("error", {error: req.params.errorMessage})
    })

    router.get("/check-session/:email", isLogin, UsuariosController.getByEmail)
}
