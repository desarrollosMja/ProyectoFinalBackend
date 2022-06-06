class Usuario{
    constructor(nombre, edad, email, password, direccion, prefijo, telefono, foto, administrador){
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
        this.password = password;
        this.direccion = direccion;
        this.prefijo = prefijo;
        this.telefono = telefono;
        this.foto = foto;
        this.administrador = administrador;
    }
}

module.exports = Usuario;