/**
 * authMiddleware.ts
 * Middleware de autenticación de Pixelando.
 * Verifica que el usuario está logueado comprobando el token JWT.
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

/**
 * Extendemos el tipo Request de Express para añadir el usuario decodificado.
 * Así podemos acceder a req.usuario en los controllers.
 */
export interface RequestConUsuario extends Request {
  usuario?: {
    id: number
    rol: string
  }
}

/**
 * Middleware que verifica el token JWT de la petición.
 * El token debe venir en el header Authorization: Bearer <token>
 * 
 * Si el token es válido, añade el usuario a req.usuario y continúa.
 * Si no, devuelve un error 401.
 * 
 * @param req - Petición HTTP con el token en el header
 * @param res - Respuesta HTTP
 * @param next - Función para continuar al siguiente middleware o controller
 */
export const authMiddleware = (req: RequestConUsuario, res: Response, next: NextFunction) => {
  try {
    // Obtiene el header Authorization
    const authHeader = req.headers.authorization

    // Comprueba que existe y tiene el formato "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ mensaje: 'No autorizado, token no proporcionado' })
    }

    // Extrae el token quitando el "Bearer " del principio
    const token = authHeader.split(' ')[1]

    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number, rol: string }

    // Añade el usuario decodificado a la petición para usarlo en los controllers
    req.usuario = decoded

    // Continúa al siguiente middleware o controller
    next()

  } catch (error) {
    res.status(401).json({ mensaje: 'No autorizado, token inválido' })
  }
}

export {}