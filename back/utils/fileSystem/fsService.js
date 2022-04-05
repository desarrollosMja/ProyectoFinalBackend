const fs = require("fs")
const {v4: uuidv4} = require('uuid')

class ManejadorArchivos{
    constructor(name){
        this.name = name
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
            const producto = productos.filter(producto => producto.id == id)
            return producto
        } catch (error) {
            console.log(error)
        }
    }

    async create(producto){
        try {
            const productos = await this.getAll()
            const productoConID = {...producto, id: uuidv4()}
            productos.push(productoConID)
            await fs.promises.writeFile(this.name, JSON.stringify(productos))
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        try {
            const productos = await this.getAll()
            const index = productos.findIndex(producto => producto.id == id)
            productos.splice(index, 1)
            await fs.promises.writeFile(this.name, JSON.stringify(productos))
        } catch (error) {
            console.log(error)
        }
    }

    async modify(id, data){
        try {
            await this.delete(id)
            const producto = {...data, id}
            const productos = await this.getAll()
            productos.push(producto)
            await fs.promises.writeFile(this.name, JSON.stringify(productos))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ManejadorArchivos