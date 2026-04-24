import './navbar.css'
import logo from '../assets/logo_navbar.png'
import { motion } from 'framer-motion'
import { useState } from 'react'

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
          transition: {
            duration: 0.4,
            ease: 'easeInOut'
          }
        }}
      />
      <ul className={menuAbierto ? 'nav-links abierto' : 'nav-links'}>
        <li>Inicio</li>
        <li>Galería</li>
        <li>Encargos</li>
        <li>Contacto</li>
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