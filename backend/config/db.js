const mongoose = require('mongoose')

//Función de conexión entre MOngo DB y el server
const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch(error){
    console.error(error)
    process.exit(1)
  }
} 

module.exports = connectDB