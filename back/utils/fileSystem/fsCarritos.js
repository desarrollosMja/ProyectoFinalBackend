const fs = require("fs")
const {v4: uuidv4} = require('uuid')

class ManejadorArchivos{
    constructor(name){
        this.name = name
    }

    async createCart(carrito){
        try {
            const cart = await this.getCart()
            const cartConID = {items: [carrito.item], id: uuidv4()}
            cart.push(cartConID)
            await fs.promises.writeFile(this.name, JSON.stringify(cart))
            return cartConID.id
        } catch (error) {
            return []
        }
    }

    async getCart(){
        try {
            const cart = await fs.promises.readFile(this.name, "utf-8")
            return JSON.parse(cart)
        } catch (error) {
            return [];
        }
    }

    async updateCart(carritos){
        try {
            await fs.promises.writeFile(this.name, JSON.stringify(carritos))
        } catch (error) {
            return error;
        }
    }

    async deleteCart(id){
        try {
            const carritos = await this.getCart()
            const index = carritos.findIndex(carrito => carrito.id == id)
            carritos.splice(index, 1)
            await fs.promises.writeFile(this.name, JSON.stringify(carritos))
        } catch (error) {
            return error;
        }
    }
}

module.exports = ManejadorArchivos