//paquetes necesarios para el funcionamiento de las rutas de usuario
const express = require('express')
const router = express.Router()

//funcion para verificar si se tiene un token
const { protect } = require('../middleware/authMiddleware')

//funcion para verificar si es el usuario correcto
const { userProtect } = require('../middleware/userMiddleware')

//funciones de los controladores
const { 
  crearUsuario, 
  loginUsuario, 
  updateUsuario, 
  datosUsuario, 
  activateUsuario, 
  softDeleteUsuario, 
  destroyUsuario 
} = require('../controllers/usuariosControlador')

//endpoints para la interacción con los datos de los usuarios
router.post('/', crearUsuario)
router.post('/login', loginUsuario)
router.get('/datos', protect, datosUsuario)
router.patch('/desactivate/:id', protect, userProtect, updateUsuario)
router.patch('/activate/:id', protect, userProtect, activateUsuario)
router.delete('/:id', protect, userProtect, softDeleteUsuario)
router.delete('/destroy/:id', protect, userProtect, destroyUsuario)

//se exporta el router de usuario
module.exports = router