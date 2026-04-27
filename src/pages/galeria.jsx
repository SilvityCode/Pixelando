import './galeria.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const rarezas = [
  {
    id: 1,
    nombre: 'Común',
    tamaño: 'hasta 10x10cm',
    precio: '6€',
    color: 'comun',
    descripcion: 'Perfecto para llaveros e imanes'
  },
  {
    id: 2,
    nombre: 'Raro',
    tamaño: 'hasta 20x20cm',
    precio: '15€',
    color: 'raro',
    descripcion: 'Ideal para cuadros y decoración'
  },
  {
    id: 3,
    nombre: 'Épico',
    tamaño: 'hasta 30x30cm',
    precio: '30€',
    color: 'epico',
    descripcion: 'Para piezas grandes y detalladas'
  },
  {
    id: 4,
    nombre: 'Legendario',
    tamaño: 'Encargo personalizado',
    precio: 'desde 20€',
    color: 'legendario',
    descripcion: 'Tu diseño, hecho a medida'
  }
]

function Galeria() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ transformOrigin: 'center center' }}
    >
      <div className="galeria-page">
        <h1 className="galeria-titulo">Tabla de Rarezas</h1>
        <p className="galeria-subtitulo">¡Elige tu nivel!</p>

        <div className="rarezas-grid">
          {rarezas.map(rareza => (
            <div key={rareza.id} className={`rareza-card ${rareza.color}`}>
              <h2 className="rareza-nombre">{rareza.nombre}</h2>
              <p className="rareza-tamaño">{rareza.tamaño}</p>
              <p className="rareza-descripcion">{rareza.descripcion}</p>
              <p className="rareza-precio">{rareza.precio}</p>
              <Link to={`/encargos?rareza=${rareza.color}`}>
                <button className="rareza-btn">Encargar</button>
              </Link>
            </div>
          ))}
        </div>

        <h2 className="galeria-ejemplos-titulo">Ejemplos</h2>
        <div className="galeria-grid">
          <p className="galeria-pronto">Próximamente...</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Galeria