const Producto = require("../productos")
const { clientProductos , dbNameProductos } = require("../../../daos/mongoAtlasProductos")
const { ObjectId } = require('mongodb');
//const { crearProducto, modificarProducto, obtenerProductos, obtenerProductoPorID, borrarProducto } = require("../model/productosModel")

class ProductosServices{
    async getProductos(req){
        try {
            await clientProductos.connect();
            const db = clientProductos.db(dbNameProductos);
            const col = db.collection("productos");

            if (!req.params.pid) {
                return await col.find({}).toArray()
            } else {
                const producto = await col.findOne({_id: ObjectId(`${req.params.pid}`)})
                if (producto == null){
                    return {error: "El id ingresado no corresponde a un producto"}
                } else return producto
            }
        } catch (error) {
            return {error: error}
        }

        finally {
            await clientProductos.close()
        }
    }

    async createProducto(req){
        await clientProductos.connect();
        const db = clientProductos.db(dbNameProductos);
        const col = db.collection("productos");

        try {
            let {nombre, descripcion, codigo, urlFoto, precio, stock} = req.body
            const nuevoProducto = new Producto(nombre, descripcion, codigo, urlFoto, precio, stock)
            await col.insertOne(nuevoProducto)
            return await col.find({}).toArray()
        } catch (error) {
            return {error: error}
        }

        finally {
            await clientProductos.close()
        }
    }

    async deleteProducto(req){
        await clientProductos.connect();
        const db = clientProductos.db(dbNameProductos);
        const col = db.collection("productos");

        try {
            const del = await col.deleteOne({_id: ObjectId(`${req.params.pid}`)})
            console.log(del)
            return await col.find({}).toArray()
        } catch (error) {
            console.log(error)
            return {error: error}
        }

        finally {
            await clientProductos.close()
        }
    }

    async modifyProducto(req){
        await clientProductos.connect();
        const db = clientProductos.db(dbNameProductos);
        const col = db.collection("productos");

        try {
            await col.updateOne({_id: ObjectId(`${req.params.pid}`)}, {
                $set:{
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    codigo: req.body.codigo,
                    urlFoto: req.body.urlFoto,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    addedToCart: req.body.addedToCart
                }
            })
            return await col.find({}).toArray()
        } catch (error) {
            return {error: error}
        }

        finally {
            await clientProductos.close()
        }
    }
}

module.exports = new ProductosServices();