const LocalStrategy = require("passport-local").Strategy
let UsuariosController = require("./controller/usuariosController")
let UsuariosServices = require("./services/usuariosService")

function initializePassport(passport){

    passport.use('login', new LocalStrategy({usernameField: "email", passReqToCallback: true},
        async (req, email, password, done)=>{
        try {
            const user = await UsuariosServices.getUsuario(req)
            if(!user)return done(null, false)
            if(user.password != password)return done(null, false)
            return done(null, user)
        } catch (error) {
            console.log(error)
        }
    }))

    passport.use('register', new LocalStrategy({usernameField: "email", passReqToCallback: true},
        async (req, email, password, done)=>{
        try {
            const usuario = await UsuariosServices.getUsuario(req)
            if(usuario != null) return done(null,false)
            let {nombre, edad, email, password, direccion, prefijo, telefono, foto, tipoUsuario} = req.body
            const user = {
                nombre, edad, email, password, direccion, prefijo, telefono, foto, tipoUsuario
            }
            const userCreated = await UsuariosServices.createUsuario(req)
            return done(null, userCreated)
        } catch (error) {
            console.log(error)
        }
    }));

    passport.serializeUser((user, done)=>{
        done(null, user)
    });

    passport.deserializeUser(async (user, done) => {
        try {
            let usuario = await UsuariosServices.getByEmail(user.email)
            done(null, usuario)
        } catch (error) {
            console.log(error)   
        }
    });

}

module.exports = initializePassport