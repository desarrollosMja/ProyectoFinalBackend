const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/avatares'))
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    },
    mimetype: "jpg,jpeg,png,gif"
})

module.exports = multer({
    storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Sólo es posible cargar archivos de imagen'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
})