import './encargos.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import pergamino from '../assets/pergamino.png'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const rarezas = [
  {
    id: 'comun',
    nombre: 'Común',
    precio: '6€',
    tamaño: 'hasta 10x10cm',
    descripcion: 'Perfecto para llaveros e imanes pequeños'
  },
  {
    id: 'raro',
    nombre: 'Raro',
    precio: '15€',
    tamaño: 'hasta 20x20cm',
    descripcion: 'Ideal para cuadros y decoración de pared'
  },
  {
    id: 'epico',
    nombre: 'Épico',
    precio: '30€',
    tamaño: 'hasta 30x30cm',
    descripcion: 'Para piezas grandes y muy detalladas'
  },
  {
    id: 'legendario',
    nombre: 'Legendario',
    precio: 'desde 20€',
    tamaño: 'Encargo personalizado',
    descripcion: 'Tu diseño a medida, consultamos precio según complejidad'
  },
  {
    id: 'mitico',
    nombre: 'Mítico',
    tamaño: 'Pack personalizado',
    precio: 'desde 30€',
    color: 'mitico',
    descripcion: 'Ideal para sets, colecciones o regalos.'
  }
]

function Encargos() {
  const [searchParams] = useSearchParams()
  const rarezaInicial = searchParams.get('rareza') || 'comun'
  const [rarezaSeleccionada, setRarezaSeleccionada] = useState(rarezaInicial)
  const [tooltip, setTooltip] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [enlace, setEnlace] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState(null)

  const { usuario, token } = useAuth()
  const navigate = useNavigate()

  /**
   * Maneja el envío del formulario.
   * Si no está logueado muestra el modal de login.
   * Si está logueado envía el pedido al backend.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!usuario) {
      setMostrarModal(true)
      return
    }

    try {
      await axios.post(
        `${API_URL}/pedidos`,
        {
          rareza: rarezaSeleccionada,
          tipoCuenta: 'web',
          descripcion,
          enlace
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setEnviado(true)
    } catch (err) {
      setError('Ha ocurrido un error al enviar el pedido. Inténtalo de nuevo.')
    }
  }

  if (enviado) {
    return (
      <div className="encargos-page">
        <div className="encargos-exito">
          <h2>¡Pedido enviado! 🎉</h2>
          <p>Te contactaremos en menos de 24h. ¡Gracias por confiar en Pixelando!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="encargos-page">
      <h1 className="encargos-titulo">Hacer un Encargo</h1>
      <p className="encargos-subtitulo">Rellena el formulario y te contactamos en menos de 24h</p>

      <form className="encargos-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Rareza</label>
          <div className="rareza-selector">
            {rarezas.map(r => (
              <div
                key={r.id}
                className={`rareza-opcion ${r.id} ${rarezaSeleccionada === r.id ? 'seleccionada' : ''}`}
                onClick={() => setRarezaSeleccionada(r.id)}
                onMouseEnter={() => setTooltip(r.id)}
                onMouseLeave={() => setTooltip(null)}
              >
                <span className="rareza-opcion-nombre">{r.nombre}</span>
                <span className="rareza-opcion-precio">{r.precio}</span>

                {tooltip === r.id && (
                  <div className="tooltip">
                    <p className="tooltip-tamaño">{r.tamaño}</p>
                    <p className="tooltip-desc">{r.descripcion}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Descripción del diseño</label>
          <textarea
            placeholder="Describe qué quieres, personaje, colores, referencias..."
            rows={4}
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Enlace de referencia (opcional)</label>
          <input
            type="text"
            placeholder="Pinterest, Instagram, Google Images..."
            value={enlace}
            onChange={e => setEnlace(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Foto de referencia (opcional)</label>
          <input type="file" accept="image/*" className="file-input" />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="pergamino-btn-img">
          <img src={pergamino} alt="Realizar pedido" className="pergamino-img" />
        </button>
      </form>

      {/* Modal que aparece si el usuario no está logueado */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>¡Inicia sesión para continuar!</h2>
            <p>Necesitas una cuenta para realizar un encargo y poder hacer seguimiento de tu pedido.</p>
            <div className="modal-botones">
              <button onClick={() => navigate('/acceder')} className="modal-btn-primary">
                Iniciar sesión
              </button>
              <button onClick={() => setMostrarModal(false)} className="modal-btn-secondary">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Encargos