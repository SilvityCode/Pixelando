/**
 * server.js
 * Punto de entrada principal del servidor de Pixelando.
 * Configura Express, middlewares globales y arranca el servidor.
 */

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

// Carga las variables de entorno desde el archivo .env
dotenv.config()

const app = express()

/**
 * Middlewares globales
 * cors() → permite peticiones desde el frontend
 * express.json() → parsea el body de las peticiones como JSON
 */
app.use(cors())
app.use(express.json())

/**
 * Ruta de comprobación
 * GET /
 * Devuelve un mensaje para verificar que el servidor está funcionando
 */
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Pixelando funcionando' })
})


/**
 * Puerto en el que escucha el servidor, por defecto 3000 
 * Arranca el servidor en el puerto configurado
 */
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})