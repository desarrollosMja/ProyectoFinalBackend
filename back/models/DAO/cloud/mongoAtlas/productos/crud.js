const { clientProductos , dbNameProductos } = require("./mongoAtlasProductos")
const { ObjectId } = require('mongodb')
const db = clientProductos.db(dbNameProductos);
const col = db.collection("productos");

class CrudProductos{
    async startConnection(){
        try {
            await clientProductos.connect()
        } catch (error) {
            return error
        }
    }

    async getAll(){
        try {
            await this.startConnection();
            return await col.find({}).toArray()
        } catch (error) {
            return error
        }

        finally{
            await clientProductos.close()
        }
    }

    async getById(id){
        try {
            await this.startConnection();
            return await col.findOne({_id: ObjectId(`${id}`)})
        } catch (error) {
            return error
        }

        finally{
            await clientProductos.close()
        }
    }

    async createProduct(data){
        try {
            await this.startConnection();
            await col.insertOne(data)
        } catch (error) {
            return error
        }

        finally{
            await clientProductos.close()
        }
    }

    async deleteProduct(id){
        try {
            await this.startConnection();
            await col.deleteOne({_id: ObjectId(`${id}`)})
        } catch (error) {
            return error
        }

        finally{
            await clientProductos.close()
        }
    }

    async updateProduct(req){
        try {
            await this.startConnection();
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
        } catch (error) {
            return error
        }

        finally{
            await clientProductos.close()
        }
    }
}

module.exports = CrudProductos