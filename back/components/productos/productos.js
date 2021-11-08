class Producto{
    constructor(id, nombre, descripcion, codigo, urlFoto, precio, stock){
        this.id = id
        this.timestamp = Date.now()
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.urlFoto = urlFoto
        this.precio = precio
        this.stock = stock
        this.addedToCart = 0
    }
}

module.exports = Producto