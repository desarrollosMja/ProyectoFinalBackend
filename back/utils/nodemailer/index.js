const { createTransport } = require("nodemailer")
const { config } = require("../../config")

const nodemailerTransporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.EMAIL_ADDRESS,
        pass: config.EMAIL_PASSWORD
    }
})

module.exports = { nodemailerTransporter }