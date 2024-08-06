const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  usuario:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  restaurante:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurante'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Favorito', userSchema)