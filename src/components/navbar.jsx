import './navbar.css'
import logo from '../assets/logo_navbar.png'
import { motion } from 'framer-motion'

function Navbar() {
  return (
    <nav>
      <motion.img
        src={logo}
        alt="Pixelando"
        className="nav-logo"
        whileHover={{
          rotate: [0, -5, 5, -3, 3, 0],
          transition: {
            duration: 0.6,
            ease: 'easeInOut'
          }
        }}
      />
      <ul>
        <li>Inicio</li>
        <li>Galería</li>
        <li>Encargos</li>
        <li>Contacto</li>
      </ul>
    </nav>
  )
}

export default Navbar