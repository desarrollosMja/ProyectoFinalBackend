const { Router } = require("express")
const router = Router()
const administrador = require("../../utils/middlewares/administrador")
let ProductosController = require("./controllers/productosController")

module.exports = (app) => {
    app.use("/api/productos", router)
    
    router.get("/:id?", ProductosController.getProductos) //disponible para usuarios y administradores

    router.post("/", administrador, ProductosController.createProducto) //disponible para administradores

    router.put("/:id", administrador, ProductosController.modifyProducto) //disponible para administradores

    router.delete("/:id", administrador, ProductosController.deleteProducto) //disponible para administradores
}