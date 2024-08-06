const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  restaurante:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurante'
  },
  descripcion:{
    type: String,
    required: [true, 'Ingresa el contenido del comentario']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comentario', userSchema)