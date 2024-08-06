const express = require('express')
const router = express.Router()
const { crearComentario, updateComentario, obtenerComentarios } = require('../controllers/comentariosControlador')
const { protect } = require('../middleware/authMiddleware')

router.post('/:id', protect, crearComentario)
router.get('/:id', protect, obtenerComentarios)
router.patch('/:id', protect, updateComentario)

module.exports = router