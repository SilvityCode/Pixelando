/**
 * authController.ts
 * Controlador de autenticación de Pixelando.
 * Gestiona el registro y login de usuarios.
 */

import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../lib/prisma'

/**
 * Registra un nuevo usuario en la base de datos.
 * 
 * @route POST /auth/registro
 * @param req.body.nombre - Nombre del usuario
 * @param req.body.email - Email del usuario (debe ser único)
 * @param req.body.password - Contraseña en texto plano (se encriptará)
 * @returns El usuario creado sin la contraseña
 */
export const registro = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body

    // Comprueba si ya existe un usuario con ese email
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExiste) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' })
    }

    // Encripta la contraseña antes de guardarla
    // El número 10 es el "salt rounds", cuántas veces se encripta (más = más seguro pero más lento)
    const passwordEncriptada = await bcrypt.hash(password, 10)

    // Crea el usuario en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordEncriptada
      }
    })

    // Devuelve el usuario sin la contraseña por seguridad
    const { password: _, ...usuarioSinPassword } = nuevoUsuario

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: usuarioSinPassword
    })

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

/**
 * Inicia sesión con email y contraseña.
 * Si las credenciales son correctas, devuelve un token JWT.
 * 
 * @route POST /auth/login
 * @param req.body.email - Email del usuario
 * @param req.body.password - Contraseña en texto plano
 * @returns Token JWT y datos básicos del usuario
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Busca el usuario por email
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    // Si no existe el usuario, error genérico (no decimos si es el email o la contraseña por seguridad)
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' })
    }

    // Compara la contraseña introducida con la encriptada en la BD
    const passwordCorrecta = await bcrypt.compare(password, usuario.password!)

    if (!passwordCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' })
    }

    // Genera el token JWT con el id y rol del usuario
    // El token expira en 7 días
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    res.json({
      mensaje: 'Login correcto',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    })

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}