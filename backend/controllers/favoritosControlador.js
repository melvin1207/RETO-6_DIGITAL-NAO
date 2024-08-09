//paquetes necesarios para el archivo
const asyncHandler = require('express-async-handler')
const Favorito = require('../models/favoritoModelo')
const Restaurante = require('../models/restauranreModelo')

//crear un favorito
const crearFavorito = asyncHandler(async (req, res) => {

  //se crea un favorito con el id del usuario y el id del restaurante
  const favorito = await Favorito.create({
    usuario: req.usuario.id,
    restaurante: req.params.id,
  })

  //se obtiene el restaurante favorito
  const restaurante = await Restaurante.findById(req.params.id)

  //se da una respuesta con el restaurante
  res.status(201).json(restaurante)
})

//obtener los favoritos de un usuario
const obtenerFavoritos = asyncHandler(async (req, res) => {
  //se obtienen los documentos de favoritos del usuario
  const favoritos = await Favorito.find({ usuario:req.usuario.id })

  //se obtiene el id de cada restaurante favorito
  const restauranteId = []
  favoritos.forEach(favorito => {
    restauranteId.push(favorito.restaurante)
  });

  const restaurantes = []

  //se obtiene la información de cada resturante favorito
  for(let i = 0; i <= restauranteId.length - 1; i ++ ){
    let restaurante = await Restaurante.findById(restauranteId[i])
    restaurantes.push(restaurante)
  }
  
  res.status(200).json(restaurantes)
})

//eliminar un favorito
const deleteFavorito = asyncHandler(async (req, res) => {
  //se busca el favorito con el id
  const favorito = await Favorito.findById(req.params.id)

  //si no existe se lanza un error
  if (!favorito) {
    res.status(400)
    throw new Error('Ese favorito no existe')
  }

  //nos aseguramos que el favorito pertenezca al usuario logeado, es decir el del token
  if (favorito.usuario.toString() !== req.usuario.id) {
    res.status(401)
    throw new Error('Usuario no autorizado')
  } else {
    //se elimina el favorito
    await Favorito.deleteOne(favorito)
    res.status(200).json({ id: req.params.id })
  }
})

//se exportan todas las funciones
module.exports = {
  crearFavorito,
  obtenerFavoritos,
  deleteFavorito
}