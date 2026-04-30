import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from "./components/navbar"
import Home from "./pages/home"
import Footer from "./components/footer"
import Galeria from "./pages/galeria"
import Encargos from "./pages/encargos"
import Acceder from "./pages/acceder"

function App() {
  const location = useLocation()

  return (
    <div>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/encargos" element={<Encargos />} />
          <Route path="/acceder" element={<Acceder />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App