const asyncHandler = require('express-async-handler')
const Restaurante = require('../models/restauranreModelo')

//Crear un restaurante
const crearRestaurante = asyncHandler(async(req, res) => {
  //Se destructura el body de la petición
  const { nombre, latitud, longitud, horarios } = req.body

  //Se verifica que la petición tenga todos los datos necesarios
  if(!nombre || !latitud || !longitud || !horarios){
    res.status(400)
    throw new Error('Faltan datos')
  }
  
  //Se verifica que el restaurante ingresado sea unico
  const restauranteExiste = await Restaurante.findOne({ nombre })
  if (restauranteExiste){
    res.status(400)
    throw new Error('El restaurante ya existe')
  }
  
  //Objeto para crear el restaurante
  const restaurante = await Restaurante.create({
    nombre,
    latitud,
    longitud,
    horarios,
    rating: 0, 
    votos: 0,
    likes: 0,
    dislikes: 0
  }) 
  
  if(restaurante){
    res.status(201).json({
      _id: restaurante._id,
      nombre: restaurante.nombre,
      latitud: restaurante.latitud,
      longitud: restaurante.longitud,
      horarios: restaurante.horarios,
      rating: restaurante.rating,
      votos: restaurante.votos,
      likes: restaurante.likes,
      dislikes: restaurante.dislikes
    })
  } else{
    res.status(400)
    throw new Error('No se pudieron guardar los datos')
  }
})

//Obtener  todos los restaurantes
const obtenerRestaurantes= asyncHandler(async(req,res) => {
  const restaurantes = await Restaurante.find({})
  res.status(200).json(restaurantes)
})

//Obtener un solo restaurante
const obtenerRestaurante = asyncHandler(async(req, res) =>{
  const { nombre } = req.body

  const restaurante = await Restaurante.findOne({ nombre })
  res.status(200).json(restaurante)
})

//Actualizar un restaurante
const updateRestaurante = asyncHandler(async(req, res) =>{
  const restaurante = await Restaurante.findById(req.params.id)

  if(!restaurante){
    res.status(400)
    throw new Error("El restaurante no existe")
  } else{
    const restauranteActualizado = await Restaurante.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(restauranteActualizado)
  }
})

//Actualizar puntuacion del restaurante
const updateRestauranteLike = asyncHandler(async(req, res) =>{  
  const restaurante = await Restaurante.findById(req.params.id)

  const likeUpdate = {
    likes: 1 + parseFloat(restaurante.likes),
    votos: 1 + parseFloat(restaurante.votos),
  }

  const averageUpdate = {
    likes: parseFloat(likeUpdate.likes),
    votos: parseFloat(likeUpdate.votos),
    rating: (parseFloat(likeUpdate.likes) / parseFloat(likeUpdate.votos)) * 100
  }

  if(!restaurante){
    res.status(400)
    throw new Error("El restaurante no existe")
  } else{
    const restauranteActualizado = await Restaurante.findByIdAndUpdate(req.params.id, averageUpdate, { new: true })
    res.status(200).json(restauranteActualizado)
  }
})

//Actualizar puntuacion del restaurante
const updateRestauranteDislike = asyncHandler(async(req, res) =>{
  const restaurante = await Restaurante.findById(req.params.id)

  const dislikeUpdate = {
    dislikes: 1 + parseFloat(restaurante.dislikes),
    votos: 1 + parseFloat(restaurante.votos),
  }

  const averageUpdate = {
    dislikes: parseFloat(dislikeUpdate.dislikes),
    votos: parseFloat(dislikeUpdate.votos),
    rating: (parseFloat(restaurante.likes) / parseFloat(dislikeUpdate.votos)) * 100
  }

  if(!restaurante){
    res.status(400)
    throw new Error("El restaurante no existe no existe")
  } else{
    const restauranteActualizado = await Restaurante.findByIdAndUpdate(req.params.id, averageUpdate, { new: true })
    res.status(200).json(restauranteActualizado)
  }
})

//SoftDelete de un restaurante
const softDeleteRestaurante = asyncHandler(async(req, res) =>{
  const restauranteDesactivado = await Restaurante.findByIdAndUpdate(req.params.id, { activo: false }, { new: true })
  res.status(200).json(restauranteDesactivado)
})

//Activar un reestaurante
const activateRestaurante = asyncHandler(async(req, res) =>{
  const restauranteActivado = await Restaurante.findByIdAndUpdate(req.params.id, { activo: true }, { new: true })
  res.status(200).json(restauranteActivado)
})

//Borrar definitivamente un restaurante
const destroyRestaurante = asyncHandler(async(req, res) =>{
  const restaurante = await Restaurante.findById(req.params.id)

  if(!restaurante){
    res.status(400)
    throw new Error('El restaurante no existe')
  } else{
    await Restaurante.deleteOne(restaurante)
    res.status(200).json({ id: req.params.id })
  }
})

module.exports = {
  crearRestaurante,
  obtenerRestaurantes,
  obtenerRestaurante,
  updateRestaurante,
  updateRestauranteLike,
  updateRestauranteDislike,
  softDeleteRestaurante,
  activateRestaurante,
  destroyRestaurante
}