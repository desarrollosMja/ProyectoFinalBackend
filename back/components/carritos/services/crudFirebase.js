const { db } = require("../../../utils/daos/firebase")
let carritos = db.collection("carritos")

const crearCarrito = async (data) => {
    const res = await carritos.add(data)
    return res.id
}

const traerCarrito = async (id) => {
    const res = await carritos.doc(id).get()
    return res
}

const updateCarrito = async (id, data) => {
    const res = await carritos.doc(id).update(data)
    return res
}

const borrarCarrito = async (id) => {
    const res = await carritos.doc(id).delete()
    return res
}

module.exports = {
    crearCarrito,
    traerCarrito,
    updateCarrito,
    borrarCarrito
}