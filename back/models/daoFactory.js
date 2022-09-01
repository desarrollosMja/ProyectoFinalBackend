let { config } = require("../config")
let local = {
    CrudProducts: require("./DAO/local/productos/crud.js"),
    CrudUsers: require("./DAO/local/usuarios/crud.js"),
    CrudCarts: require("./DAO/local/carritos/crud.js")
}

let cloud = {
    CrudProducts: require("./DAO/cloud/mongoAtlas/productos/crud.js"),
    CrudUsers: require("./DAO/cloud/mongoAtlas/usuarios/crud.js"),
    CrudCarts: require("./DAO/cloud/mongoAtlas/carritos/crud.js")
}

class DaosFactory{
    static clienteProductos
    static clienteUsuarios
    static clienteCarritos
    constructor(){
        if (!DaosFactory.clienteProductos && !DaosFactory.clienteUsuarios && !DaosFactory.clienteCarritos){
            if (config.NODE_ENV == "development"){
                DaosFactory.clienteProductos = new local.CrudProducts()
                DaosFactory.clienteUsuarios = new local.CrudUsers()
                DaosFactory.clienteCarritos = new local.CrudCarts()
            } else if (config.NODE_ENV == "production") {
                DaosFactory.clienteProductos = new cloud.CrudProducts()
                DaosFactory.clienteUsuarios = new cloud.CrudUsers()
                DaosFactory.clienteCarritos = new cloud.CrudCarts()
            }
        }
    }

    //Products methods
    async getAllProducts(){
        try {
            return await DaosFactory.clienteProductos.getAll()
        } catch (error) {
            console.log(error)
        }
    }

    async getOneProduct(id){
        try {
            return await DaosFactory.clienteProductos.getById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async setNewProduct(data){
        try {
            return await DaosFactory.clienteProductos.createProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            return await DaosFactory.clienteProductos.deleteProduct(id)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(req){
        try {
            return await DaosFactory.clienteProductos.updateProduct(req)
        } catch (error) {
            console.log(error)
        }
    }

    //Users methods
    async getUserByEmail(email){
        try {
            return await DaosFactory.clienteUsuarios.getByEmail(email)
        } catch (error) {
            console.log(error)
        }
    }

    async setNewUser(data){
        try {
            return await DaosFactory.clienteUsuarios.createUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    //Carts methods
    async getOneCart(id){
        try {
            return await DaosFactory.clienteCarritos.getById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async setNewCart(data){
        try {
            return await DaosFactory.clienteCarritos.createCart(data)
        } catch (error) {
            console.log(error)
        }
    }

    async updateCart(id, data){
        try {
            return await DaosFactory.clienteCarritos.updateCart(id, data)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(id){
        try {
            return await DaosFactory.clienteCarritos.deleteCart(id)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new DaosFactory()