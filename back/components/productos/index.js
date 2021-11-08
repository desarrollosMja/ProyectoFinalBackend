const { Router } = require("express")
const router = Router()
const login = require("../../utils/middlewares/login")
let ProductosController = require("./controllers/productosController")

module.exports = (app) => {
    app.use("/api/productos", router)
    
    router.get("/:id?", ProductosController.getProductos) //disponible para usuarios y administradores

    router.post("/", login, ProductosController.createProducto) //disponible para administradores

    router.put("/:id", login, ProductosController.modifyProducto) //disponible para administradores

    router.delete("/:id", login, ProductosController.deleteProducto) //disponible para administradores
}