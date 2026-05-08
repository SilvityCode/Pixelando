/**
 * authRoutes.ts
 * Define las rutas públicas de autenticación de Pixelando.
 * Estas rutas no requieren estar logueado para acceder.
 */

import { Router } from 'express'
import { registro, login } from '../controllers/authController'

const router = Router()

/**
 * POST /auth/registro
 * Registra un nuevo usuario
 * Body: { nombre, email, password }
 */
router.post('/registro', registro)

/**
 * POST /auth/login
 * Inicia sesión y devuelve un token JWT
 * Body: { email, password }
 */
router.post('/login', login)

export default router