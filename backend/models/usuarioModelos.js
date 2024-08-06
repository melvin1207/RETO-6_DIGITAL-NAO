const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  nombre:{
    type: String,
    required: [true, 'Por favor ingrese el nombre'],
    maxlength : [ 50, 'El nombre no puede exceder los 50 caracteres'],
    minlength : [ 3, 'El nombre debe contener 3 o más caracteres'] 
  },
  apellido:{
    type: String,
    required: [true, 'Por favor ingresa el apellido'],
    maxlength : [ 100, 'Los apellidos no pueden exceder los 100 caracteres'],
    minlength : [ 3, 'El apellido debe contener 3 o más caracteres'] 
  },
  email:{
    type: String,
    required: [true, 'Ingresa el email del comprador'],
    unique: [ true, 'El correo está duplicado'],
    maxlength: [ 100, 'El correo no puede exceder los 100 caracteres'],
  },
  password:{
    type: String,
    required: [true, 'Ingresa la contraseña']
  },
  activo:{
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Usuario', userSchema)