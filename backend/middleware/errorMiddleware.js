//función manejadora de errores dentro de la API REST
const errorHandler = (err, req, res, next) =>{
  const statusCode = res.statusCode ? res.statusCode : 500

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

//se exporta la función
module.exports = {
  errorHandler
}