const express = require('express')
const router = express.Router()
const { crearRestaurante, obtenerRestaurantes, obtenerRestaurante, updateRestaurante, updateRestauranteLike, updateRestauranteDislike, softDeleteRestaurante, activateRestaurante, destroyRestaurante } = require('../controllers/restaurantesControlador')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, crearRestaurante)
router.get('/', protect, obtenerRestaurantes)
router.get('/busqueda', protect, obtenerRestaurante)
router.patch( '/update/:id', protect, updateRestaurante)
router.patch( '/activate/:id', protect, activateRestaurante)
router.patch('/like/:id', protect, updateRestauranteLike)
router.patch('/dislike/:id', protect, updateRestauranteDislike)
router.delete('/:id', protect, softDeleteRestaurante)
router.delete('/destroy/:id', protect, destroyRestaurante)

module.exports = router