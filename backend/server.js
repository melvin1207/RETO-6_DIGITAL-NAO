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

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/usuarios', require('./routes/usuarioRutas'))
app.use('/api/restaurantes', require('./routes/restaurenteRutas'))

app.use(errorHandler)

//se inicializa el servidor
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))