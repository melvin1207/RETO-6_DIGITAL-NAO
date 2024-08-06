//paquetes necesarios para el funcionamiento de la función
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuarioModelos')


//la función permite solo editar los objetos que se tienen si y solo si se cuenta con un token de acceso si no no se puede realizar un cambio
const protect = asyncHandler(async(req, res, next) => {
  let  token
  
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.usuario = await Usuario.findById(decoded.id_usuario).select('-password')
      
      next()
    } catch(error){
      console.log(error)
      res.status(401)
      throw new Error('Acceso no permitido')
    }
  }

  if(!token){
    res.status(401)
    throw new Error('No hay un token disponible, acceso no autorizado')
  }
})

module.exports = { protect }