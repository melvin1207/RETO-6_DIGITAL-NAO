//paquetes necesarios para el funcionamiento de la función
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuarioModelos')


/*la función permite solo editar los objetos que se tienen si y solo si se cuenta con un token de acceso 
si no no se puede realizar un cambio */
const protect = asyncHandler(async(req, res, next) => {
  let  token
  
  //se verificara si se tiene un berare token de acceso
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{

      //si lo tiene se procede a obtener el usuario correspondiente
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.usuario = await Usuario.findById(decoded.id_usuario).select('-password')
      
      //se pasa a lo siguiente en el codigo
      next()
    } catch(error){
      //si no hay un usuario se lanza un error
      console.log(error)
      res.status(401)
      throw new Error('Acceso no permitido')
    }
  }

  //si no hay un token se lanza un nuevo error
  if(!token){
    res.status(401)
    throw new Error('No hay un token disponible, acceso no autorizado')
  }
})

//se exporta la función
module.exports = { protect }