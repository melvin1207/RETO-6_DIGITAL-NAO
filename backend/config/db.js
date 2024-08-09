//se incluye mongoose en el archivo
const mongoose = require('mongoose')

//Función de conexión entre MOngo DB y el server
const connectDB = async () => {
  try{
    //Se conecta a la base de datos
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch(error){
    //si no se conecta a MongoDB se lanzara un error
    console.error(error)
    process.exit(1)
  }
} 

//se exporta la función para usarla en archivos externos
module.exports = connectDB