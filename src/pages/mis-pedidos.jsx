import './mis-pedidos.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

/**
 * Devuelve la clase CSS según el estado del pedido
 */
const claseEstado = (estado) => {
  const clases = {
    PENDIENTE: 'estado-pendiente',
    EN_PROCESO: 'estado-en-proceso',
    COMPLETADO: 'estado-completado',
    CANCELADO: 'estado-cancelado'
  }
  return clases[estado] || ''
}

/**
 * Devuelve el emoji según el estado del pedido
 */
const emojiEstado = (estado) => {
  const emojis = {
    PENDIENTE: '⏳',
    EN_PROCESO: '⚒️',
    COMPLETADO: '✅',
    CANCELADO: '❌'
  }
  return emojis[estado] || ''
}

function MisPedidos() {
  const { token } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await axios.get(`${API_URL}/pedidos/mis-pedidos`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPedidos(res.data.pedidos)
      } catch (err) {
        console.error('Error al cargar pedidos:', err)
      } finally {
        setCargando(false)
      }
    }

    fetchPedidos()
  }, [token])

  if (cargando) {
    return (
      <div className="mis-pedidos-page">
        <p className="mis-pedidos-cargando">Consultando los archivos del gremio...</p>
      </div>
    )
  }

  return (
    <div className="mis-pedidos-page">
      <h1 className="mis-pedidos-titulo">Mis Encargos del Gremio</h1>
      <p className="mis-pedidos-subtitulo">Aquí puedes seguir el estado de todos tus encargos</p>

      {pedidos.length === 0 ? (
        <div className="mis-pedidos-vacio">
          <p>¡Aún no has hecho ningún encargo!</p>
          <Link to="/encargos" className="mis-pedidos-link">
            Hacer mi primer encargo
          </Link>
        </div>
      ) : (
        <div className="mis-pedidos-lista">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-card-header">
                <span className="pedido-rareza">{pedido.rareza}</span>
                <span className={`pedido-estado ${claseEstado(pedido.estado)}`}>
                  {emojiEstado(pedido.estado)} {pedido.estado.replace('_', ' ')}
                </span>
              </div>

              <p className="pedido-descripcion">{pedido.descripcion}</p>

              <div className="pedido-card-footer">
                <span className="pedido-fecha">
                  📅 {new Date(pedido.creadoEn).toLocaleDateString('es-ES')}
                </span>
                <span className="pedido-precio">
                  {pedido.precio ? `💰 ${pedido.precio}€` : '💰 Precio pendiente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MisPedidos