const { connection, mongoose, conectarMongo } = require("../mongodb")
conectarMongo()

const { ObjectId } = require('mongodb')
const productSchema = require("./schema.js")
const model = mongoose.model("Product", productSchema)


class CrudProducts{
    async getAll(){
        try {
            return await model.find({})
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            return await model.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createProduct(data){
        try {
            return await model.create(data)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            return await model.deleteOne({_id: ObjectId(`${id}`)})
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(req){
        try {
            return await model.findOneAndUpdate(
                {_id: ObjectId(`${req.params.pid}`)},
                {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    codigo: req.body.codigo,
                    urlFoto: req.body.urlFoto,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    addedToCart: req.body.addedToCart
                })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CrudProducts