import './home.css'
import logo from '../assets/logo.png'
import cofreCerrado from '../assets/cofreCerrado.png'
import cotreAbierto from '../assets/cofreAbierto.png'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function Home() {
  const [abierto, setAbierto] = useState(false)

  const handleCofre = () => {
    setAbierto(true)
    setTimeout(() => {
      document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.img
          src={logo}
          alt="Pixelando"
          className="hero-logo"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          Arte en píxeles, <span>hecho a mano</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          Creaciones únicas de hama beads. Personajes, encargos y mucho color.
        </motion.p>

        <div className="cofre-container" onClick={handleCofre}>
          <span className="cofre-texto-top">Ver la galería</span>
          <AnimatePresence mode="wait">
            {!abierto ? (
              <motion.img
                key="cerrado"
                src={cofreCerrado}
                alt="cofre cerrado"
                className="cofre-img"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.img
                key="abierto"
                src={cotreAbierto}
                alt="cofre abierto"
                className="cofre-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </div>

        <section id="galeria" style={{ marginTop: '100vh', color: 'white' }}>
          <h2>Galería</h2>
        </section>

      </div>
    </section>
  )
}

export default Home