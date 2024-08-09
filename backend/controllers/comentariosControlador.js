//paquetes necesarios para el archivo
const asyncHandler = require('express-async-handler')
const Comentario = require('../models/comentarioModelo')

//crear un comentario
const crearComentario = asyncHandler(async (req, res) => {
  //se verifica que haya contenido en el request si no se lanza un error
  if(!req.body.descripcion){
    res.status(400)
    throw new Error("Faltan datos")
  }

  //se crea un comentario incluyendo el id del restaurante y el contenido
  const comentario = await Comentario.create({
    restaurante: req.params.id,
    descripcion: req.body.descripcion
  })

  res.status(201).json(comentario) //respuesta con los datos
})

//obtener los comentarios de un restaurante
const obtenerComentarios = asyncHandler(async (req, res) => {
  //se obtiene el id del restaurante y los comentarios del restaurante
  const comentarios = await Comentario.find({ restaurante:req.params.id })
  res.status(200).json(comentarios) //se da una respuesta con los comentarios
})

//editar comentario
const updateComentario = asyncHandler(async (req, res) => {
  //se obtiene el comentario con el id
  const comentario = await Comentario.findById(req.params.id)

  //si no existe el comentario se lanza un error
  if (!comentario) {
      res.status(400)
      throw new Error('Ese comentario no existe')
  }

  //se actualiza el coemntario
  const comentarioActualizado = await Comentario
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    
  res.status(200).json(comentarioActualizado)
})

//se esportan todas las funciones
module.exports = {
  crearComentario,
  obtenerComentarios,
  updateComentario
}