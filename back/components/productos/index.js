const { Router } = require("express")
const router = Router()
const methodOverride = require("method-override")
let ProductosController = require("./controllers/productosController")

module.exports = (app) => {
    app.use(methodOverride("_method"))
    app.use("/api/productos", router)
    
    router.get("/:id?", ProductosController.getProductos) //disponible para usuarios y administradores

    router.post("/", ProductosController.createProducto) //disponible para administradores

    router.put("/:id", (req,res) => console.log("entré"))

    //router.put("/:id", ProductosController.modifyProducto) //disponible para administradores

    router.delete("/:id", ProductosController.deleteProducto) //disponible para administradores
}