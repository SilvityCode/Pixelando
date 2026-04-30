import './navbar.css'
import logo from '../assets/logo_navbar.png'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <nav>
      <motion.img
        src={logo}
        alt="Pixelando"
        className="nav-logo"
        whileHover={{
          rotate: [0, -5, 5, -3, 3, 0],
          transition: { duration: 0.6, ease: 'easeInOut' }
        }}
      />

      <ul className={menuAbierto ? 'nav-links abierto' : 'nav-links'}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/galeria">Galería</Link></li>
        <li><Link to="/encargos">Encargos</Link></li>
        <li><Link to="/acceder">Acceder</Link></li>
      </ul>

      <div className="hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Navbar