const { Router } = require("express")
const router = Router()
let CarritosController = require("./controllers/carritosController")

module.exports = (app) => {
    app.use("/api/carrito", router)

    router.post("/", CarritosController.createCarrito) //Crear carrito y devolver ID

    router.delete("/:id", CarritosController.deleteCarrito) //Eliminar carrito por ID

    router.get("/:id/productos", CarritosController.getCarrito) //Obtener productos de un carrito por ID

    router.post("/:id/productos", CarritosController.addProducto) //Añadir producto a un carrito por ID

    router.post("/:idCarrito/:idProducto", CarritosController.addUnidad) //Agregar unidad a producto previamente agregado a un carrito

    router.delete("/:idCarrito/productos/:idProducto", CarritosController.deleteProducto) //Eliminar producto de un carrito por ID
}