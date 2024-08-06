const asyncHandler = require('express-async-handler')
const Favorito = require('../models/favoritoModelo')
const Restaurante = require('../models/restauranreModelo')

//crear un favorito
const crearFavorito = asyncHandler(async (req, res) => {

  const favorito = await Favorito.create({
    usuario: req.usuario.id,
    restaurante: req.params.id,
  })

  const restaurante = await Restaurante.findById(req.params.id)

  res.status(201).json(restaurante)
})

//obtener los favoritos de un usuario
const obtenerFavoritos = asyncHandler(async (req, res) => {
  const favoritos = await Favorito.find({ usuario:req.usuario.id })

  const restauranteId = []
  favoritos.forEach(favorito => {
    restauranteId.push(favorito.restaurante)
  });

  const restaurantes = []

  for(let i = 0; i <= restauranteId.length - 1; i ++ ){
    let restaurante = await Restaurante.findById(restauranteId[i])
    restaurantes.push(restaurante)
  }
  
  res.status(200).json(restaurantes)
})

//eliminar un favorito
const deleteFavorito = asyncHandler(async (req, res) => {
  const favorito = await Favorito.findById(req.params.id)

  if (!favorito) {
    res.status(400)
    throw new Error('Ese favorito no existe')
  }

  //nos aseguramos que el favoritopertenezca al usuario logeado, es decir el del token
  if (favorito.usuario.toString() !== req.usuario.id) {
    res.status(401)
    throw new Error('Usuario no autorizado')
  } else {
    await Favorito.deleteOne(favorito)
    res.status(200).json({ id: req.params.id })
  }
})

module.exports = {
  crearFavorito,
  obtenerFavoritos,
  deleteFavorito
}