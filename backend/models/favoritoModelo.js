//se incluye mongoose en el archivo
const mongoose = require('mongoose')

//se hace el esquema de Favorito para la base de datos
const userSchema = mongoose.Schema({
  // propiedad de Id de Usuario
  usuario:{
    type: mongoose.Schema.Types.ObjectId, //tipo de dato
    required: true, //es obligatorio
    ref: 'Usuario' //de donde se obtendra los Id de los usuarios
  },

  // propiedad de Id de Restaurante
  restaurante:{
    type: mongoose.Schema.Types.ObjectId, //tipo de dato
    required: true, //es obligatorio
    ref: 'Restaurante' //de donde se obtendra los Id de los restaurantes
  }
}, {

  // propiedad de fecha
  timestamps: true //tipo de dato especial de fecha de MongoDB
})

//se exporta el modelo de Favorito para poder usarlo
module.exports = mongoose.model('Favorito', userSchema)