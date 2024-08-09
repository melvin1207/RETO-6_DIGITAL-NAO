//paquetes necesarios para el funcionamiento de las rutas de usuario
const express = require('express')
const router = express.Router()

//funcion para verificar si se tiene un token
const { protect } = require('../middleware/authMiddleware')

//funciones de los controladores
const { 
  crearRestaurante, 
  obtenerRestaurantes, 
  obtenerRestaurante, 
  updateRestaurante, 
  updateRestauranteLike, 
  updateRestauranteDislike, 
  softDeleteRestaurante, 
  activateRestaurante, 
  destroyRestaurante, 
  restaurantesCercanos 
} = require('../controllers/restaurantesControlador')

//endpoints para la interacción con los datos de los restaurantes
router.post('/', protect, crearRestaurante)
router.get('/', protect, obtenerRestaurantes)
router.get('/busqueda', protect, obtenerRestaurante)
router.get('/:id', protect, restaurantesCercanos)
router.patch( '/update/:id', protect, updateRestaurante)
router.patch( '/activate/:id', protect, activateRestaurante)
router.patch('/like/:id', protect, updateRestauranteLike)
router.patch('/dislike/:id', protect, updateRestauranteDislike)
router.delete('/:id', protect, softDeleteRestaurante)
router.delete('/destroy/:id', protect, destroyRestaurante)

//se exporta el router de restaurantes
module.exports = router