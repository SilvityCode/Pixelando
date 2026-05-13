/**
 * server.ts
 * Punto de entrada principal del servidor de Pixelando.
 * Configura Express, middlewares globales y arranca el servidor.
 */

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import pedidoRoutes from './routes/pedidoRoutes'

const app = express()

/**
 * Middlewares globales
 * cors() → permite peticiones desde el frontend
 * express.json() → parsea el body de las peticiones como JSON
 */
app.use(cors())
app.use(express.json())

/**
 * Rutas públicas
 * /auth → rutas de registro y login
 */
app.use('/auth', authRoutes)

/**
 * Rutas de pedidos
 * /pedidos → rutas de creación y consulta de pedidos
 */
app.use('/pedidos', pedidoRoutes) 


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