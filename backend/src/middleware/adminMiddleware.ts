/**
 * adminMiddleware.ts
 * Middleware de autorización de Pixelando.
 * Verifica que el usuario autenticado tiene rol de ADMIN.
 * Siempre debe usarse después de authMiddleware.
 */

import { Response, NextFunction } from 'express'
import { RequestConUsuario } from './authMiddleware'

/**
 * Middleware que verifica que el usuario tiene rol ADMIN.
 * 
 * Si el usuario es admin, continúa.
 * Si no, devuelve un error 403 (prohibido).
 * 
 * @param req - Petición HTTP con el usuario decodificado por authMiddleware
 * @param res - Respuesta HTTP
 * @param next - Función para continuar al siguiente middleware o controller
 */
export const adminMiddleware = (req: RequestConUsuario, res: Response, next: NextFunction) => {
  if (req.usuario?.rol !== 'ADMIN') {
    return res.status(403).json({ mensaje: 'Acceso prohibido, se requiere rol de administrador' })
  }

  next()
}