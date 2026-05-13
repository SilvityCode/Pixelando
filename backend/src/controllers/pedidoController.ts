/**
 * pedidoController.ts
 * Controlador de pedidos de Pixelando.
 * Gestiona la creación, consulta y actualización de pedidos.
 */

import { Response } from 'express'
import { prisma } from '../lib/prisma'
import { RequestConUsuario } from '../middleware/authMiddleware'

/**
 * Crea un nuevo pedido para el usuario autenticado.
 * 
 * @route POST /pedidos
 * @access Usuario autenticado
 * @param req.body.rareza - Rareza del pedido
 * @param req.body.tipoCuenta - Tipo de cuenta
 * @param req.body.descripcion - Descripción del pedido
 * @param req.body.enlace - Enlace de referencia (opcional)
 * @param req.body.imagenes - Array de URLs de imágenes (opcional)
 * @returns El pedido creado con sus imágenes
 */
export const crearPedido = async (req: RequestConUsuario, res: Response) => {
  try {
    const { rareza, tipoCuenta, descripcion, enlace, imagenes } = req.body
    const usuarioId = req.usuario!.id

    // Crea el pedido junto con sus imágenes en una sola operación
    // Prisma permite crear registros relacionados al mismo tiempo con "create"
    const pedido = await prisma.pedido.create({
      data: {
        usuarioId,
        rareza,
        tipoCuenta,
        descripcion,
        enlace,
        imagenes: {
          create: imagenes?.map((url: string) => ({ url })) ?? []
        }
      },
      // Include le dice a Prisma que devuelva también las imágenes relacionadas
      include: {
        imagenes: true
      }
    })

    res.status(201).json({
      mensaje: 'Pedido creado correctamente',
      pedido
    })

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

/**
 * Devuelve todos los pedidos del usuario autenticado.
 * Solo ve sus propios pedidos, no los de otros usuarios.
 * 
 * @route GET /pedidos/mis-pedidos
 * @access Usuario autenticado
 * @returns Lista de pedidos del usuario con sus imágenes
 */
export const misPedidos = async (req: RequestConUsuario, res: Response) => {
  try {
    const usuarioId = req.usuario!.id

    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId },
      include: { imagenes: true },
      // Ordena por fecha de creación, el más reciente primero
      orderBy: { creadoEn: 'desc' }
    })

    res.json({ pedidos })

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

/**
 * Devuelve todos los pedidos de todos los usuarios.
 * Solo accesible por administradores.
 * 
 * @route GET /pedidos
 * @access Admin
 * @returns Lista de todos los pedidos con datos del usuario e imágenes
 */
export const todosLosPedidos = async (req: RequestConUsuario, res: Response) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        imagenes: true,
        // Include del usuario para que el admin vea quién hizo cada pedido
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      },
      orderBy: { creadoEn: 'desc' }
    })

    res.json({ pedidos })

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

/**
 * Actualiza el estado de un pedido.
 * Solo accesible por administradores.
 * 
 * @route PATCH /pedidos/:id/estado
 * @access Admin
 * @param req.params.id - ID del pedido a actualizar
 * @param req.body.estado - Nuevo estado (PENDIENTE, EN_PROCESO, COMPLETADO, CANCELADO)
 * @param req.body.precio - Precio del pedido (opcional)
 * @returns El pedido actualizado
 */
export const actualizarEstado = async (req: RequestConUsuario, res: Response) => {
  try {
    const { id } = req.params
    const { estado, precio } = req.body

    // Comprueba que el pedido existe antes de actualizarlo
    const pedidoExiste = await prisma.pedido.findUnique({
      where: { id: Number(id) }
    })

    if (!pedidoExiste) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' })
    }

    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: {
        estado,
        // Solo actualiza el precio si se ha proporcionado
        ...(precio !== undefined && { precio })
      },
      include: { imagenes: true }
    })

    res.json({
      mensaje: 'Pedido actualizado correctamente',
      pedido
    })

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

