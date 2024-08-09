//se incluye mongoose en el archivo
const mongoose = require('mongoose')

//se hace el esquema de Usuario para la base de datos
const userSchema = mongoose.Schema({
  // propiedad de nombre
  nombre:{
    type: String,  //tipo de dato
    required: [true, 'Por favor ingrese el nombre'], //es requerido 
    maxlength : [ 50, 'El nombre no puede exceder los 50 caracteres'], //maximo de longitud
    minlength : [ 3, 'El nombre debe contener 3 o más caracteres']  //minimo de longitud
  }, 

  // propiedad de apelido
  apellido:{
    type: String, //tipo de dato
    required: [true, 'Por favor ingresa el apellido'], //es requerido 
    maxlength : [ 100, 'Los apellidos no pueden exceder los 100 caracteres'], //maximo de longitud
    minlength : [ 3, 'El apellido debe contener 3 o más caracteres']  //minimo de longitud
  },

  // propiedad de email
  email:{
    type: String, //tipo de dato
    required: [true, 'Ingresa el email del comprador'], //es requerido 
    unique: [ true, 'El correo está duplicado'], //debe ser unico
    maxlength: [ 100, 'El correo no puede exceder los 100 caracteres'] //maximo de longitud
  },

  // propiedad de password
  password:{
    type: String, //tipo de dato
    required: [true, 'Ingresa la contraseña'] //es requerido 
  },

  // propiedad de activo
  activo:{
    type: Boolean, //tipo de dato
    default: true  //se asigna un valor por default para que el usuario no lo tenga que registrar
  }
}, {
  // propiedad de fecha
  timestamps: true //tipo de dato especial de fecha de MongoDB
})

//se exporta el modelo de Usuario para poder usarlo
module.exports = mongoose.model('Usuario', userSchema)