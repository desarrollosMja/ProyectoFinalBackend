let productos = require("../components/productos")

// const Carrito = require("../carritos")

let administrador //varible booleana que determina si el usuario es o no administrador y si puede o no ingresar a determinadas rutas

module.exports = (app) => {
    productos(app)
}

// function serverRouterCarrito(app){
//     app.use("/api/carrito", router)

//     router.post("/", (req,res,next) => {
//         //crear carrito y devolver ID
//     })

//     router.delete("/:id", (req,res,next) => {
//         //vaciar un carrito por ID y elminarlo
//     })

//     router.get("/:id/productos", (req,res,next) => {
//         //devolver todos los productos insertos en un carrito por ID
//     })

//     router.post("/:id/productos", (req,res,next) => {
//         //agregar un producto a un carrito por ID
//     })

//     router.delete("/:id/productos/:id_prod", (req,res,next) => {
//         //eliminar un producto por ID de un carrito por ID
//     })
// }

// module.exports = serverRouterCarrito