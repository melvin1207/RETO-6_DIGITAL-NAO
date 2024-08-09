//paquetees  y funciones necesarios para el archivo
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
  
  //si se crea el restaurante se regresa una respuesta con los datos del restaurante
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
    //si no se lanza un error
    res.status(400)
    throw new Error('No se pudieron guardar los datos')
  }
})

//Obtener  todos los restaurantes
const obtenerRestaurantes= asyncHandler(async(req,res) => {
  const restaurantes = await Restaurante.find({}) //se obtienen todos los restaurantes
  res.status(200).json(restaurantes) //se da una respuesta json 
})

//Obtener un solo restaurante
const obtenerRestaurante = asyncHandler(async(req, res) =>{
  const { nombre } = req.body // se busca en el request la propiedad nombre

  const restaurante = await Restaurante.findOne({ nombre }) //se busca dentro de la BD
  res.status(200).json(restaurante) //se da una respuesta con lso datos
})

//Actualizar un restaurante
const updateRestaurante = asyncHandler(async(req, res) =>{

  //se busca el restaurante a partir del id
  const restaurante = await Restaurante.findById(req.params.id)

  //si no existe se lanza un error
  if(!restaurante){
    res.status(400)
    throw new Error("El restaurante no existe")
  } else{
    //si existe se actualiza y se da una respuesta con las actualizaciones
    const restauranteActualizado = await Restaurante
      .findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(restauranteActualizado)
  }
})

//Actualizar puntuacion del restaurante
const updateRestauranteLike = asyncHandler(async(req, res) =>{  
  //se busca el restaurante a partir del id
  const restaurante = await Restaurante.findById(req.params.id)

  //se hace un objeto para guardar la info del request
  const likeUpdate = {
    likes: 1 + parseFloat(restaurante.likes),
    votos: 1 + parseFloat(restaurante.votos),
  }

  //función para actualizar los likes, votos y el rating de la pelicula
  const averageUpdate = {
    likes: parseFloat(likeUpdate.likes),
    votos: parseFloat(likeUpdate.votos),

    //formula para actualizar el rating
    rating: (parseFloat(likeUpdate.likes) / parseFloat(likeUpdate.votos)) * 100
  }

  //si el restaurante no existe se lanza un error
  if(!restaurante){
    res.status(400)
    throw new Error("El restaurante no existe")
  } else{
    //si existe se actualizan los datos y se lanza una respuesta 
    const restauranteActualizado = await Restaurante
      .findByIdAndUpdate(req.params.id, averageUpdate, { new: true })

    res.status(200).json(restauranteActualizado)
  }
})

//Actualizar puntuacion del restaurante
const updateRestauranteDislike = asyncHandler(async(req, res) =>{
  //se busca el restaurante a partir del id
  const restaurante = await Restaurante.findById(req.params.id)

  //se hace un objeto para guardar la info del request
  const dislikeUpdate = {
    dislikes: 1 + parseFloat(restaurante.dislikes),
    votos: 1 + parseFloat(restaurante.votos),
  }

  //función para actualizar los dislikes, votos y el rating de la pelicula
  const averageUpdate = {
    dislikes: parseFloat(dislikeUpdate.dislikes),
    votos: parseFloat(dislikeUpdate.votos),

    //formula para actualizar el rating
    rating: (parseFloat(restaurante.likes) / parseFloat(dislikeUpdate.votos)) * 100
  }

  //si el restaurante no existe se lanza un error
  if(!restaurante){
    res.status(400)
    throw new Error("El restaurante no existe no existe")
  } else{
    //si existe se actualizan los datos y se lanza una respuesta 
    const restauranteActualizado = await Restaurante
      .findByIdAndUpdate(req.params.id, averageUpdate, { new: true })

    res.status(200).json(restauranteActualizado)
  }
})

//SoftDelete de un restaurante
const softDeleteRestaurante = asyncHandler(async(req, res) =>{
  //se busca el restaurante por el id y se desactiva
  const restauranteDesactivado = await Restaurante
    .findByIdAndUpdate(req.params.id, { activo: false }, { new: true })

  res.status(200).json(restauranteDesactivado) //respuesta con las actualizaciones
})

//Activar un reestaurante
const activateRestaurante = asyncHandler(async(req, res) =>{
  //se busca el restaurante por el id y se activa
  const restauranteActivado = await Restaurante
    .findByIdAndUpdate(req.params.id, { activo: true }, { new: true })

  res.status(200).json(restauranteActivado) //respuesta con las actualizaciones
})

//Borrar definitivamente un restaurante
const destroyRestaurante = asyncHandler(async(req, res) =>{
  //se busca el restaurante por el id 
  const restaurante = await Restaurante.findById(req.params.id)

  //si no existe se lanza un error
  if(!restaurante){
    res.status(400)
    throw new Error('El restaurante no existe')
  } else{
    //si existe se borra definitivamente
    await Restaurante.deleteOne(restaurante)
    res.status(200).json({ id: req.params.id })
  }
})

//obtener restaurantes cercanos
const restaurantesCercanos = asyncHandler(async(req, res) =>{
  //se busca el restaurante por el id 
  const restauranteOriginal = await Restaurante.findById(req.params.id)

  //se obtienen todos los restaurantes 
  let restaurantesOriginal = await Restaurante.find({})

  //se elimina el restaurante principal de todos los restaurantes
  restaurantesOriginal = restaurantesOriginal
    .filter((restaurante) => String(req.params.id) !== String(restaurante._id))

  let restaurantes = []

  //funcion para obtener la distancia hacia cada restaurante
  restaurantesOriginal.forEach(restaurante => {

    //se obtiene la distancia
    let theta = restauranteOriginal.longitud - restaurante.longitud
    let distance = 60 * 1.1515 * (180/Math.PI) * 
    Math.acos(
      Math.sin(restauranteOriginal.latitud * (Math.PI / 180)) * 
      Math.sin(restaurante.latitud * (Math.PI / 180)) + 
      Math.cos(restauranteOriginal.latitud * (Math.PI / 180)) * 
      Math.cos(restaurante.latitud * (Math.PI / 180)) * 
      Math.cos(theta * (Math.PI / 180))
    )

    //se redondea a un numero entero
    d = Math.round(distance * 1.609344, 2)

    //si se esta dentro de la distancia marcada se anexa al arreglo de restaurantes
    if(d <= 109){
      restaurantes.push(restaurante)
    }
  })

  //se responde con los restaurantes cercanos
  res.status(200).json(restaurantes)
})


//se exportan todas las funciones
module.exports = {
  crearRestaurante,
  obtenerRestaurantes,
  obtenerRestaurante,
  updateRestaurante,
  updateRestauranteLike,
  updateRestauranteDislike,
  softDeleteRestaurante,
  activateRestaurante,
  destroyRestaurante,
  restaurantesCercanos
}