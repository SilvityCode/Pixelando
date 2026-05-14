/**
 * RutaProtegida.jsx
 * Componente que protege rutas que requieren autenticación.
 * Si el usuario no está logueado, lo redirige a /acceder.
 * Si se requiere rol admin y el usuario no lo tiene, redirige al home.
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario } = useAuth()

  // Si no hay usuario logueado, redirige a login
  if (!usuario) {
    return <Navigate to="/acceder" />
  }

  // Si la ruta es solo para admin y el usuario no lo es, redirige al home
  if (soloAdmin && usuario.rol !== 'ADMIN') {
    return <Navigate to="/" />
  }

  return children
}

export default RutaProtegida