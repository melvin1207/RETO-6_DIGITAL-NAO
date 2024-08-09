//paquetes necesarios para el funcionamiento de las rutas de usuario
const express = require('express')
const router = express.Router()

//funcion para verificar si se tiene un token
const { protect } = require('../middleware/authMiddleware')

//funciones de los controladores
const { 
  crearFavorito, 
  obtenerFavoritos, 
  deleteFavorito
} = require('../controllers/favoritosControlador')

//endpoints para la interacción con los datos de los favoritos
router.post('/:id', protect, crearFavorito)
router.get('/', protect, obtenerFavoritos)
router.delete('/:id', protect, deleteFavorito)

//se exporta el router de favoritos
module.exports = router