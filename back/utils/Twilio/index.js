const twilio = require("twilio")
const { config } = require("../../config")
const winston = require("../loggers/winston")

const accountSid = config.TWILIO_ACCOUNT_SID
const authToken = config.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

async function sendPedidoCreado(dest){
    try {
        const message = await client.messages.create({
            body: 'Su pedido ha sido confirmado y se encuentra en proceso. Muchas gracias!',  
            messagingServiceSid: config.TWILIO_MESSAGING_SERVICE_SID,      
            to: dest
        })
        winston.debug(message)
    } catch (error) {
        winston.error(error)
    }
}

async function sendConfirmacionAdministrador(data){
    const { user, carrito, total } = data
    let listado = carrito.map(producto => {
        return `Item: ${producto.item.nombre}
                Precio: ${producto.item.precio}
                Unidades compradas: ${producto.item.addedToCart}
                ------------------------
                `
    })
    listado += `TOTAL DE LA COMPRA: $ ${total}`
    
    try {      
        await client.messages.create({ 
                // body: `
                //     <h1>Nuevo pedido de ${user.nombre} - ${user.email}</h1><hr/>
                //     <span>${lista}</span><hr/>
                //     <h2>Total de la compra: $ ${req.body.total}</h2>
                // `,
                body: `
                        Nuevo pedido de ${user.nombre}: ${user.email}
                        ${listado}
                        `,
                from: `whatsapp:${config.TWILIO_USA_PHONE}`,       
                to: `whatsapp:${config.TWILIO_ADMINISTRATOR_PHONE_NUMBER}`
            }) 
            .then(message => winston.debug(message.sid)) 
            .done()
    } catch (error) {
        winston.error(error)
    }
}

module.exports = {sendPedidoCreado, sendConfirmacionAdministrador}