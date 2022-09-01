const { connection, mongoose, conectarMongo } = require("../mongodb")
conectarMongo()

const { ObjectId } = require('mongodb')
const cartSchema = require("./schema.js")
const model = mongoose.model("Cart", cartSchema)


class CrudCarts{
    async getById(id){
        try {
            return await model.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createCart(data){
        try {
            return await model.create(data)
        } catch (error) {
            console.log(error)
        }
    }

    async updateCart(id, data){
        try {
            const cartUpdated = await model.findOneAndUpdate({_id: ObjectId(`${id}`)}, data)
            return cartUpdated
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(id){
        try {
            return await model.deleteOne({_id: ObjectId(`${id}`)})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CrudCarts