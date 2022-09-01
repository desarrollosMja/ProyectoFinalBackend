const { clientCarritos , dbNameCarritos } = require("./mongoAtlasCarritos.js")
const { ObjectId } = require('mongodb')
const db = clientCarritos.db(dbNameCarritos);
const col = db.collection("carritos");

class CrudCarritos{
    async startConnection(){
        try {
            await clientCarritos.connect()
        } catch (error) {
            return error
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
            await clientCarritos.close()
        }
    }

    async createCart(data){
        try {
            await this.startConnection();
            let newCart = await col.insertOne(data)
            const cadena = JSON.stringify(newCart.insertedId)
            const idCarrito = cadena.slice(1,cadena.length-1)
            newCart = await this.getById(idCarrito)
            return newCart
        } catch (error) {
            return error
        }

        finally{
            await clientCarritos.close()
        }
    }

    async deleteCart(id){
        try {
            await this.startConnection();
            await col.deleteOne({_id: ObjectId(`${id}`)})
        } catch (error) {
            return error
        }

        finally{
            await clientCarritos.close()
        }
    }

    async updateCart(id, data){
        try {
            await this.startConnection();
            console.log("Update Cart en CRUD", id, data)
            await col.findOneAndReplace({_id: ObjectId(`${id}`)}, data)
        } catch (error) {
            return error
        }

        finally{
            await clientCarritos.close()
        }
    }
}

module.exports = CrudCarritos