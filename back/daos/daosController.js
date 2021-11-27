const { conectarMongo } = require("./mongodb");
const { crearProducto, modificarProducto, obtenerProductos, obtenerProductoPorID, borrarProducto } = require("../components/productos/model/productosModel");

(async () => {
    try {
        conectarMongo()
        //await borrarProducto(12)
        console.log(await obtenerProductos())
        //obtenerProductoPorID(30)
        //console.log(await obtenerProductos())
        //crearProducto({id: 40, timestamp: 0000, nombre: "Bicicleta mágica de 10000000 de cambios y frenos a pedal", codigo: 123, precio: 157000, stock: 15, addedToCart: 0})
        //modificarProducto(20, {nombre: "Bicicleta para reparar"})
    } catch (error) {
        console.log(error)
    }
})();
