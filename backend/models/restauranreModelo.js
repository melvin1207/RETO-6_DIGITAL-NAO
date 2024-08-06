const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  nombre:{
    type: String,
    required: [true, "Ingresa el nombre del restaurante"]
  },
  latitud:{
    type: Number,
    required: [true, 'Ingresa la latitud del restaurante']
  },
  longitud:{
    type: Number,
    required: [true, 'Ingresa la longitud del restaurante']
  },
  horarios:{
    type: String,
    required: [true, 'Ingresa el horario del restaurante']
  },
  likes:{
    type: Number,
    required: [true, 'Indica si te gusto o no la pelicula'],
    default: 0
  },
  dislikes:{
    type: Number,
    required: [true, 'Indica si te no gusto la pelicula'],
    default: 0
  },
  rating:{
    type: Number,
    required: [true, 'Indica el promedio de las puntuaciones de la pelicula'],
    default: 0
  },
  votos:{
    type: Number,
    required: [true, 'Indica la puntuación para la pelicula del 1 al 10'],
    default: 0
  },
  activo:{
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Restaurante', userSchema)