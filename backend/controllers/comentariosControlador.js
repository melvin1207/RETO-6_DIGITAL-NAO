const asyncHandler = require('express-async-handler')
const Comentario = require('../models/comentarioModelo')

//crear un comentario
const crearComentario = asyncHandler(async (req, res) => {
  if(!req.body.descripcion){
    res.status(400)
    throw new Error("Faltan datos")
  }

  const comentario = await Comentario.create({
    restaurante: req.params.id,
    descripcion: req.body.descripcion
  })

  res.status(201).json(comentario)
})

//obtener los comentarios de un restaurante
const obtenerComentarios = asyncHandler(async (req, res) => {
  const comentarios = await Comentario.find({ restaurante:req.params.id })
  res.status(200).json(comentarios)
})

//editar comentario
const updateComentario = asyncHandler(async (req, res) => {
  const comentario = await Comentario.findById(req.params.id)

  if (!comentario) {
      res.status(400)
      throw new Error('Ese comentario no existe')
  }

  const comentarioActualizado = await Comentario.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(comentarioActualizado)
})

module.exports = {
  crearComentario,
  obtenerComentarios,
  updateComentario
}