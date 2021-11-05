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
    }
}

module.exports = Producto