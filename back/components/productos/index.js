const { Router } = require("express")
const router = Router()
const administrador = require("../../utils/middlewares/administrador")
let ProductosController = require("./controllers/productosController")

module.exports = (app) => {
    app.use("/api/products", router)
    
    router.get("/:pid?", ProductosController.getProductos) //disponible para usuarios y administradores

    router.post("/", administrador, ProductosController.createProducto) //disponible para administradores

    router.put("/:pid", administrador, ProductosController.modifyProducto) //disponible para administradores

    router.delete("/:pid", administrador, ProductosController.deleteProducto) //disponible para administradores
}
