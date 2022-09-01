const { client, dbName } = require("./mongoAtlasUsuarios")
const db = client.db(dbName);
const col = db.collection("usuarios");

class CrudUsuarios{
    async startConnection(){
        try {
            await client.connect()
        } catch (error) {
            return error
        }
    }

    async getByEmail(email){
        try {
            await this.startConnection();
            return await col.findOne({email: email})
        } catch (error) {
            return error
        }

        finally{
            await client.close()
        }
    }

    async createUser(data){
        try {
            await this.startConnection();
            return await col.insertOne(data)
        } catch (error) {
            return error
        }

        finally{
            await client.close()
        }
    }
}

module.exports = CrudUsuarios