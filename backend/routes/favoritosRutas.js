const express = require('express')
const router = express.Router()
const { crearFavorito, obtenerFavoritos, deleteFavorito } = require('../controllers/favoritosControlador')
const { protect } = require('../middleware/authMiddleware')

router.post('/:id', protect, crearFavorito)
router.get('/', protect, obtenerFavoritos)
router.delete('/:id', protect, deleteFavorito)

module.exports = router