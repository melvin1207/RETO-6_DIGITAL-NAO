//paquetes necesarios para el funcionamiento de las rutas de usuario
const express = require('express')
const router = express.Router()

//funcion para verificar si se tiene un token
const { protect } = require('../middleware/authMiddleware')

//funciones de los controladores
const { 
  crearComentario, 
  updateComentario, 
  obtenerComentarios 
} = require('../controllers/comentariosControlador')

//endpoints para la interacción con los datos de los comentarios
router.post('/:id', protect, crearComentario)
router.get('/:id', protect, obtenerComentarios)
router.patch('/:id', protect, updateComentario)

//se exporta el router de comentarios
module.exports = router