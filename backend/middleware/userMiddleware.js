//paquetes necesarios
const asyncHandler = require('express-async-handler')

//función para verificar si el usuario logueado es el correspondiente
const userProtect = asyncHandler(async(req, res, next) =>{
  try{
    // se comprueba si el id del usuario con el del loguado son iguales
    if(req.usuario.id !== req.params.id){
      res.status(401)
      throw new Error("Not authorized")
    } else{
      next()
    }
  } catch(error){

    //si los id no son iguales se lanza un error
    console.log(error)
    res.status(401)
    throw new Error('Acceso no permitido')
  }
})

//se exporta la función
module.exports = { userProtect }