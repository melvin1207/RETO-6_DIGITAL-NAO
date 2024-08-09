//se incluye mongoose en el archivo
const mongoose = require('mongoose')

//se hace el esquema de Comentrio para la base de datos
const userSchema = mongoose.Schema({

  // propiedad de Id de Restaurante
  restaurante:{
    type: mongoose.Schema.Types.ObjectId, //tipo de dato
    required: true, //es obligatorio
    ref: 'Restaurante' //de donde se obtendra los Id de los restaurantes
  },

  // propiedad de contenido
  descripcion:{
    type: String, //tipo de dato 
    required: [true, 'Ingresa el contenido del comentario'] //es obligatorio 
  }
}, {

  // propiedad de fecha
  timestamps: true //tipo de dato especial de fecha de MongoDB
})

//se exporta el modelo de Comentario para poder usarlo
module.exports = mongoose.model('Comentario', userSchema)