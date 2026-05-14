/**
 * RutaProtegida.jsx
 * Componente que protege rutas que requieren autenticación.
 * Si el usuario no está logueado, lo redirige a /acceder.
 * Si está logueado, muestra el contenido de la ruta.
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ children }) {
  const { usuario } = useAuth()

  // Si no hay usuario logueado, redirige a la página de login
  if (!usuario) {
    return <Navigate to="/acceder" />
  }

  // Si hay usuario, muestra el contenido normal
  return children
}

export default RutaProtegida