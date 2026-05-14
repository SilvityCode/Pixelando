import './navbar.css'
import logo from '../assets/logo_navbar.png'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { usuario, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

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

        {usuario ? (
          // Si está logueado muestra su nombre y el botón de logout
          <>
            <li><Link to="/mis-pedidos">Mis Pedidos</Link></li>
            <li className="nav-usuario">Hola, {usuario.nombre}👋</li>
            <li>
              <button className="nav-logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          // Si no está logueado muestra el enlace de acceder
          <li><Link to="/acceder">Acceder</Link></li>
        )}
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