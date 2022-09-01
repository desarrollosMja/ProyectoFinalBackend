const { connection, mongoose, conectarMongo } = require("../mongodb")
conectarMongo()

const { ObjectId } = require('mongodb')
const userSchema = require("./schema.js")
const model = mongoose.model("User", userSchema)


class CrudUsers{
    async getByEmail(email){
        try {
            return await model.findOne({email: email})
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(data){
        try {
            return await model.create(data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CrudUsers