//paquetes y funciones necesarias para el funcionamiento de los controladores
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuarioModelos')

//Crear un usuario
const crearUsuario = asyncHandler(async(req, res) => {
  //Se destructura el body de la petición
  const { nombre, apellido, email, password } = req.body

  //Se verifica que la petición tenga todos los datos necesarios
  if(!nombre || !apellido || !email || !password){
    res.status(400)
    throw new Error('Faltan datos')
  }

  //Se verifica que el email ingresado sea unico
  const usuarioExiste = await Usuario.findOne({ email })
  if (usuarioExiste){
    res.status(400)
    throw new Error('El correo electronico ya existe')
  }

  //Se hace el HASH del password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Objeto para crear al usuario
  const usuario = await Usuario.create({
    nombre,
    apellido,
    email,
    password: hashedPassword
  }) 

  //si el usuario se crea se da una respuesta positiva y se dan ciertos datos del usuario
  if(usuario){
    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
    })
  } else{
    //si no existe se lanza un error
    res.status(400)
    throw new Error('No se pudieron guardar los datos')
  }
})

//Logear a un usuario
const loginUsuario = asyncHandler(async(req,res) => {
  //se destructura la petición
  const { email, password } = req.body

  //se verifica qu exista un usuario con el email ingrsado
  const usuario = await Usuario.findOne({ email })

  //si el usuario existe se verifica el password
  if(usuario && (await bcrypt.compare(password, usuario.password))){
    //si el password es correcto se da una respuesta positiva y se dan ciertos datos
    res.status(200).json({
      _id: usuario.id,
      nombre: usuario.nombre,
      apelllido: usuario.apelllido,
      email: usuario.email,
      token: generarToken(usuario.id)
    })
  } else{
    // si no es correcta se lanza un error
    res.status(400)
    throw new Error('Acceso no autorizado')
  }
})

//Obtener datos del usuario
const datosUsuario = asyncHandler(async(req, res) =>{
  //se destructura la petición
  res.status(200).json(req.usuario)
})

//Actualizar un usuario
const updateUsuario = asyncHandler(async(req, res) =>{
  //de la petición se toman los datos y se actualizan los datos del usuario
  const usuarioActualizado = await Usuario
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select('-password')

  //se lanza una respuesta con las actualizaciones
  res.status(200).json(usuarioActualizado)
})

//SoftDelete de un usuario
const softDeleteUsuario = asyncHandler(async(req, res) =>{
  // de la petición se toman los datos y se desactiva el usuario
  const usuarioDesactivado = await Usuario
    .findByIdAndUpdate(req.params.id, { activo: false }, { new: true })
    .select('-password')
  
  //se lanza una respuesta con las actualizaciones
  res.status(200).json(usuarioDesactivado)
})

//Reactivar un usuario
const activateUsuario = asyncHandler(async(req, res) =>{
  // de la petición se toman los datos y se activa el usuario
  const usuarioActivado = await Usuario
    .findByIdAndUpdate(req.params.id, { activo: true }, { new: true })
    .select('-password')
  
  //se lanza una respuesta con las actualizaciones
  res.status(200).json(usuarioActivado)
})

//Borrar definitivamente un usuario
const destroyUsuario = asyncHandler(async(req, res) =>{
  //se obtiene el usuario que se quiere borrar
  const usuario = await Usuario.findById(req.params.id)

  //si no hay un usuario se lanza un error
  if(!usuario){
    res.status(400)
    throw new Error('El usuario no existe')
  } else{
    //se borra el usuario
    await Usuario.deleteOne(usuario)
    res.status(200).json({ id: req.params.id })
  }
})

//funcion para generar el token
const generarToken = (id_usuario) => {
  return jwt.sign({ id_usuario }, process.env.JWT_SECRET, {
    expiresIn: '2h' //tiempo de duración del token
  })
}

//se exportan todas las funciones
module.exports = {
  crearUsuario,
  loginUsuario,
  datosUsuario,
  updateUsuario,
  destroyUsuario,
  activateUsuario,
  softDeleteUsuario
}