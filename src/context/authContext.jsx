/**
 * AuthContext.jsx
 * Contexto de autenticación de Pixelando.
 * Gestiona el estado global del usuario y el token JWT.
 * Provee funciones de login, registro y logout a toda la app.
 */

import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const API_URL = 'http://localhost:3000'

/**
 * Proveedor del contexto de autenticación.
 * Envuelve la app para que todos los componentes
 * tengan acceso al usuario y las funciones de auth.
 */
export function AuthProvider({ children }) {

  // Recupera el usuario y token del localStorage si ya estaba logueado
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario')
    return guardado ? JSON.parse(guardado) : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  /**
   * Inicia sesión con email y contraseña.
   * Guarda el token y el usuario en localStorage y en el estado.
   * 
   * @param {string} email 
   * @param {string} password 
   */
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password })
    const { token, usuario } = res.data

    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))

    setToken(token)
    setUsuario(usuario)
  }

  /**
   * Registra un nuevo usuario.
   * Después del registro inicia sesión automáticamente.
   * 
   * @param {string} nombre
   * @param {string} email
   * @param {string} password
   */
  const registro = async (nombre, email, password) => {
    await axios.post(`${API_URL}/auth/registro`, { nombre, email, password })
    await login(email, password)
  }

  /**
   * Cierra la sesión del usuario.
   * Elimina el token y el usuario del localStorage y del estado.
   */
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setToken(null)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook personalizado para usar el contexto de autenticación.
 * Uso: const { usuario, login, logout } = useAuth()
 */
export function useAuth() {
  return useContext(AuthContext)
}