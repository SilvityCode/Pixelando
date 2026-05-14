import './admin.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const emojiEstado = (estado) => {
  const emojis = { PENDIENTE: '⏳', EN_PROCESO: '⚒️', COMPLETADO: '✅', CANCELADO: '❌' }
  return emojis[estado] || ''
}

const claseEstado = (estado) => {
  const clases = { PENDIENTE: 'estado-pendiente', EN_PROCESO: 'estado-en-proceso', COMPLETADO: 'estado-completado', CANCELADO: 'estado-cancelado' }
  return clases[estado] || ''
}

function Admin() {
  const { token } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await axios.get(`${API_URL}/pedidos`, {
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

  /**
   * Actualiza el estado y/o precio de un pedido.
   * Llama al backend y actualiza el estado local sin recargar.
   */
  const actualizarPedido = async (id, estado, precio) => {
    try {
      const res = await axios.patch(
        `${API_URL}/pedidos/${id}/estado`,
        { estado, precio: precio ? parseFloat(precio) : undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setPedidos(pedidos.map(p => p.id === id ? res.data.pedido : p))
    } catch (err) {
      console.error('Error al actualizar pedido:', err)
    }
  }

  if (cargando) {
    return (
      <div className="admin-page">
        <p className="admin-cargando">Cargando los encargos del gremio...</p>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <h1 className="admin-titulo">Panel del Gremio</h1>
      <p className="admin-subtitulo">{pedidos.length} encargos en total</p>

      {pedidos.length === 0 ? (
        <p className="admin-vacio">No hay encargos todavía.</p>
      ) : (
        <div className="admin-lista">
          {pedidos.map(pedido => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              onActualizar={actualizarPedido}
              claseEstado={claseEstado}
              emojiEstado={emojiEstado}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Tarjeta individual de pedido para el admin.
 * Permite cambiar el estado y asignar precio.
 */
function PedidoCard({ pedido, onActualizar, claseEstado, emojiEstado }) {
  const [estado, setEstado] = useState(pedido.estado)
  const [precio, setPrecio] = useState(pedido.precio || '')

  const handleGuardar = () => {
    onActualizar(pedido.id, estado, precio)
  }

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div className="admin-card-usuario">
          <span className="admin-nombre">{pedido.usuario.nombre}</span>
          <span className="admin-email">{pedido.usuario.email}</span>
        </div>
        <span className={`pedido-estado ${claseEstado(pedido.estado)}`}>
          {emojiEstado(pedido.estado)} {pedido.estado.replace('_', ' ')}
        </span>
      </div>

      <div className="admin-card-info">
        <span className="admin-rareza">{pedido.rareza}</span>
        <span className="admin-fecha">📅 {new Date(pedido.creadoEn).toLocaleDateString('es-ES')}</span>
      </div>

      <p className="admin-descripcion">{pedido.descripcion}</p>

      {pedido.enlace && (
        <a href={pedido.enlace} target="_blank" rel="noreferrer" className="admin-enlace">
          🔗 Ver referencia
        </a>
      )}

      <div className="admin-controles">
        <select
          value={estado}
          onChange={e => setEstado(e.target.value)}
          className="admin-select"
        >
          <option value="PENDIENTE">⏳ Pendiente</option>
          <option value="EN_PROCESO">⚒️ En proceso</option>
          <option value="COMPLETADO">✅ Completado</option>
          <option value="CANCELADO">❌ Cancelado</option>
        </select>

        <input
          type="number"
          placeholder="Precio €"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          className="admin-precio-input"
        />

        <button onClick={handleGuardar} className="admin-btn-guardar">
          Guardar
        </button>
      </div>
    </div>
  )
}

export default Admin