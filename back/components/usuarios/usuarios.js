class Usuario{
    constructor(nombre, edad, email, password, direccion, telefono, foto, administrador){
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
        this.password = password;
        this.direccion = direccion;
        this.telefono = telefono;
        this.foto = foto;
        this.administrador = administrador;
    }
}

module.exports = Usuario;