import './galeria.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const rarezasEstandar = [
  { id: 1, nombre: 'Común', tamaño: 'hasta 10x10cm', precio: '6€', color: 'comun', descripcion: 'Perfecto para llaveros e imanes' },
  { id: 2, nombre: 'Raro', tamaño: 'hasta 20x20cm', precio: '15€', color: 'raro', descripcion: 'Ideal para cuadros y decoración' },
  { id: 3, nombre: 'Épico', tamaño: 'hasta 30x30cm', precio: '30€', color: 'epico', descripcion: 'Para piezas grandes y detalladas' },
  { id: 4, nombre: 'Legendario', tamaño: 'Encargo personalizado', precio: 'desde 20€', color: 'legendario', descripcion: 'Tu diseño, hecho a medida' },
  { id: 5, nombre: 'Mítico', tamaño: 'Pack personalizado', precio: 'desde 30€', color: 'mitico', descripcion: 'Ideal para sets, colecciones o regalos.' }
]

const rarezasPremium = [
  { id: 1, nombre: 'Común', tamaño: 'hasta 10x10cm', precio: '10-12€', color: 'comun', descripcion: 'Detalle fino para llaveros e imanes' },
  { id: 2, nombre: 'Raro', tamaño: 'hasta 20x20cm', precio: '20-25€', color: 'raro', descripcion: 'Alta precisión para cuadros y decoración' },
  { id: 3, nombre: 'Épico', tamaño: 'hasta 30x30cm', precio: '35-45€', color: 'epico', descripcion: 'Máximo detalle en piezas grandes' },
  { id: 4, nombre: 'Legendario', tamaño: 'Encargo personalizado', precio: 'desde 30€', color: 'legendario', descripcion: 'Tu diseño con precisión milimétrica' },
  { id: 5, nombre: 'Mítico', tamaño: 'Pack personalizado', precio: 'desde 50€', color: 'mitico', descripcion: 'Sets y colecciones en detalle premium' }
]

const ejemplos = [
  { id: 1, src: '/imagenes/medusa.jpeg', nombre: 'Medusa Bob Esponja', tipo: 'Estándar 5mm' },
  { id: 2, src: '/imagenes/mews_couple.jpeg', nombre: 'Mews Couple', tipo: 'Estándar 5mm' },
  { id: 3, src: '/imagenes/nyan_cat.jpeg', nombre: 'Nyan Cat', tipo: 'Estándar 5mm' },
  { id: 4, src: '/imagenes/WH_King.jpeg', nombre: 'Rey Tumulario WarHammer', tipo: 'Estándar 5mm' },
]

function Galeria() {
  const [tipo, setTipo] = useState('estandar')
  const rarezas = tipo === 'estandar' ? rarezasEstandar : rarezasPremium

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

        <div className="tipo-selector">
          <button
            className={`tipo-btn ${tipo === 'estandar' ? 'activo' : ''}`}
            onClick={() => setTipo('estandar')}
          >
            Estándar (5mm)
          </button>
          <button
            className={`tipo-btn ${tipo === 'premium' ? 'activo' : ''}`}
            onClick={() => setTipo('premium')}
          >
            Detalle Premium (2,6mm)
          </button>
        </div>

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

        <h2 className="galeria-ejemplos-titulo">Creaciones</h2>
        <div className="galeria-grid">
          {ejemplos.map(ejemplo => (
            <div key={ejemplo.id} className="ejemplo-card">
              <img src={ejemplo.src} alt={ejemplo.nombre} className="ejemplo-img" />
              <p className="ejemplo-nombre">{ejemplo.nombre}</p>
              <span className="ejemplo-tipo">{ejemplo.tipo}</span>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}

export default Galeria