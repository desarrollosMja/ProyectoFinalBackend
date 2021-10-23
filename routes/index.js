const { Router } = require("express")
const router = Router()
import Producto from "../productos"

let productos = []
let administrador //varible booleana que determina si el usuario es o no administrador y si puede o no ingresar a determinadas rutas

function getProductoById(id){
    productos.forEach((elem,index) => {
        if (elem.id == id){
            return index
        }
    })
    return false
}

function serverRouterProductos(app){
    app.use("/api/productos", router)

    router.get("/:id", (req,res,next) => {
        res.json(productos)
    }) //disponible para usuarios y administradores

    router.post("/", (req,res,next) => {
        let data = req.body
        productos.push(new Producto(data))
    }) //disponible para administradores

    router.put("/:id", (req,res,next) => {
        let data = req.body
        if (getProductoById(data.id) != false){
            productos[getProductoById(data.id)]. = data.
            ....
        }
    }) //disponible para administradores

    router.delete("/:id", (req,res,next) => {
        let data = req.body
        if (getProductoById(data.id) != false){
            productos.splice(getProductoById(data.id), 1)
        }
    }) //disponible para administradores
}

function serverRouterCarrito(app){
    app.use("/api/carrito", router)

    router.post("/", (req,res,next) => {
        //crear carrito y devolver ID
    })

    router.delete("/:id", (req,res,next) => {
        //vaciar un carrito por ID y elminarlo
    })

    router.get("/:id/productos", (req,res,next) => {
        //devolver todos los productos insertos en un carrito por ID
    })

    router.post("/:id/productos", (req,res,next) => {
        //agregar un producto a un carrito por ID
    })

    router.delete("/:id/productos/:id_prod", (req,res,next) => {
        //eliminar un producto por ID de un carrito por ID
    })
}

module.exports = serverRouterProductos
module.exports = serverRouterCarrito