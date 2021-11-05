const fs = require("fs")

class Manejador{
    constructor(name){
        this.name = name
    }

    async save(producto){
        try {
            await fs.promises.writeFile(this.name, JSON.stringify(producto, null, 2))
        } catch (error) {
            return error
        }
    }

    async getAll(){
        try {
            const productos = await fs.promises.readFile(this.name, "utf-8")
            return JSON.parse(productos)
        } catch (error) {
            return []
        }
    }

    async getById(id){
        try {
            const productos = await this.getAll()
            const productoPorId = productos.filter(elem => elem.id == id)

            if (productoPorId != []){
                return productoPorId
            } else return false
        } catch (error) {
            return error
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll()
            const index = productos.findIndex(elem => elem.id == id)
            if (index != -1){
                productos.splice(index, 1)
                await this.save(productos)
                return productos
            } else return false
        } catch (error) {
            return error
        }
    }

    async update(id, producto){
        try {
            const productos = await this.getAll()
        } catch (error) {
            return error
        }
    }

}

module.exports = Manejador