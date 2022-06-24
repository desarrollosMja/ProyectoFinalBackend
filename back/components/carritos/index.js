const { Router } = require("express")
const router = Router()
let CarritosController = require("./controllers/carritosController")

module.exports = (app) => {
    app.use("/api/carts", router)

    router.post("/", CarritosController.createCarrito) //Crear carrito y devolver ID

    router.delete("/:cid", CarritosController.deleteCarrito) //Eliminar carrito por ID

    router.get("/:cid/products", CarritosController.getCarrito) //Obtener productos de un carrito por ID

    router.post("/:cid/products", CarritosController.addProducto) //Añadir producto a un carrito por ID

    router.post("/:cid/:pid", CarritosController.addUnidad) //Agregar unidad a producto previamente agregado a un carrito

    router.delete("/:cid/products/:pid", CarritosController.deleteProducto) //Eliminar producto de un carrito por ID

    router.post("/new-operation", CarritosController.newOperation) //Gestiona la compra de los productos en el carrito
}
