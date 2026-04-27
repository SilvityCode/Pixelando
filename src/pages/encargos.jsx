import './encargos.css'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

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
  }
]

function Encargos() {
  const [searchParams] = useSearchParams()
  const rarezaInicial = searchParams.get('rareza') || 'comun'
  const [rarezaSeleccionada, setRarezaSeleccionada] = useState(rarezaInicial)
  const [tooltip, setTooltip] = useState(null)

  return (
    <div className="encargos-page">
      <h1 className="encargos-titulo">Hacer un Encargo</h1>
      <p className="encargos-subtitulo">Rellena el formulario y te contactamos en menos de 24h</p>

      <form className="encargos-form">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="tu@email.com" />
        </div>

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
          <textarea placeholder="Describe qué quieres, personaje, colores, referencias..." rows={4} />
        </div>

        <div className="form-group">
          <label>Enlace de referencia (opcional)</label>
          <input type="text" placeholder="Pinterest, Instagram, Google Images..." />
        </div>

        <div className="form-group">
          <label>Foto de referencia (opcional)</label>
          <input type="file" accept="image/*" className="file-input" />
        </div>

        <button type="submit" className="encargos-btn">Enviar encargo</button>
      </form>
    </div>
  )
}

export default Encargos