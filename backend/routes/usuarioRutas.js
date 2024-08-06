//paquetes necesarios para el funcionamiento de las rutas de usuario
const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { userProtect } = require('../middleware/userMiddleware')
const { crearUsuario, loginUsuario, updateUsuario, datosUsuario, activateUsuario, softDeleteUsuario, destroyUsuario } = require('../controllers/usuariosControlador')

//endpoints para la interacción con los datos de los usuarios
router.post('/', crearUsuario)
router.post('/login', loginUsuario)
router.get('/datos', protect, datosUsuario)
router.patch('/:id', protect, userProtect, updateUsuario)
router.patch('/activate/:id', protect, userProtect, activateUsuario)
router.delete('/:id', protect, userProtect, softDeleteUsuario)
router.delete('/destroy/:id', protect, userProtect, destroyUsuario)

module.exports = router