/**
 * pedidoRoutes.ts
 * Define las rutas de pedidos de Pixelando.
 * Las rutas de usuario requieren estar autenticado.
 * Las rutas de admin requieren estar autenticado y tener rol ADMIN.
 */

import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { adminMiddleware } from '../middleware/adminMiddleware'
import {
  crearPedido,
  misPedidos,
  todosLosPedidos,
  actualizarEstado
} from '../controllers/pedidoController'

const router = Router()

/**
 * POST /pedidos
 * Crea un nuevo pedido
 * Requiere: estar autenticado
 * Body: { rareza, tipoCuenta, descripcion, enlace?, imagenes? }
 */
router.post('/', authMiddleware, crearPedido)

/**
 * GET /pedidos/mis-pedidos
 * Devuelve los pedidos del usuario autenticado
 * Requiere: estar autenticado
 */
router.get('/mis-pedidos', authMiddleware, misPedidos)

/**
 * GET /pedidos
 * Devuelve todos los pedidos (panel de admin)
 * Requiere: estar autenticado y ser ADMIN
 */
router.get('/', authMiddleware, adminMiddleware, todosLosPedidos)

/**
 * PATCH /pedidos/:id/estado
 * Actualiza el estado y/o precio de un pedido
 * Requiere: estar autenticado y ser ADMIN
 * Body: { estado, precio? }
 */
router.patch('/:id/estado', authMiddleware, adminMiddleware, actualizarEstado)

export default router