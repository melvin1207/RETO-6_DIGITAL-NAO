//se incluye mongoose en el archivo
const mongoose = require('mongoose')

//se hace el esquema de Restaurante para la base de datos
const userSchema = mongoose.Schema({
  // propiedad de nombre
  nombre:{
    type: String, //tipo de dato
    required: [true, "Ingresa el nombre del restaurante"]
  },

  // propiedad de latitud en formato DD
  latitud:{
    type: Number, //tipo de dato 
    required: [true, 'Ingresa la latitud del restaurante'], //es obligatorio
    min: -90, //la latitud minima
    max: 90 //latitud maxima
  },

  // propiedad de longitud en formato DD
  longitud:{
    type: Number, //tipo de dato
    required: [true, 'Ingresa la longitud del restaurante'], //es obligatorio
    min: -90, //la longitud minima
    max: 90 //longitud maxima
  },

  // propiedad de horarios
  horarios:{
    type: String, //tipo de dato
    required: [true, 'Ingresa el horario del restaurante'] //es obligatorio
  },

  // propiedad de likes
  likes:{
    type: Number, //tipo de dato
    required: [true, 'Indica si te gusto o no la pelicula'], //es obligatorio
    default: 0 //se asigna un valor por default para que el usuario no lo tenga que registrar
  },

  // propiedad de dislikes
  dislikes:{
    type: Number, //tipo de dato
    required: [true, 'Indica si te no gusto la pelicula'], //es obligatorio
    default: 0 //se asigna un valor por default para que el usuario no lo tenga que registrar
  },

  // propiedad de rating
  rating:{
    type: Number, //tipo de dato
    required: [true, 'Indica el promedio de las puntuaciones de la pelicula'], //es obligatorio
    default: 0 //se asigna un valor por default para que el usuario no lo tenga que registrar
  },

  // propiedad de votos
  votos:{
    type: Number, //tipo de dato
    required: [true, 'Indica la puntuación para la pelicula del 1 al 10'], //es obligatorio
    default: 0 //se asigna un valor por default para que el usuario no lo tenga que registrar
  },

  // propiedad de activo
  activo:{
    type: Boolean, //tipo de dato
    default: true //se asigna un valor por default para que el usuario no lo tenga que registrar
  }
}, {

  // propiedad de fecha
  timestamps: true //tipo de dato especial de fecha de MongoDB
})

//se exporta el modelo de Restaurante para poder usarlo
module.exports = mongoose.model('Restaurante', userSchema)