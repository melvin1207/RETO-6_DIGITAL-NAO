//paquetes y funciones necesarias para utilizar el server
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')
const port = process.env.PORT || 5000

//se realiza la conexión con Mongo
connectDB()

//se inicializa express para el servidor
const app = express()

app.use(cors())

//se inicializa express con algunos parametros predeterminados
app.use(express.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//se importan las rutas
app.use('/api/usuarios', require('./routes/usuarioRutas'))
app.use('/api/restaurantes', require('./routes/restaurenteRutas'))
app.use('/api/comentarios', require('./routes/comentariosRutas'))
app.use('/api/favoritos', require('./routes/favoritosRutas'))

//se declara el manjejo errores
app.use(errorHandler)

//se inicializa el servidor
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))