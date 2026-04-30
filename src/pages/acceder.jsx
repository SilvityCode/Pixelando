import './acceder.css'
import { useState } from 'react'
import tablon from '../assets/tablon.png'

function Acceder() {
  const [esLogin, setEsLogin] = useState(true)

  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginErrors, setLoginErrors] = useState({})

  const [registerData, setRegisterData] = useState({ nombre: '', email: '', password: '', confirmPassword: '' })
  const [registerErrors, setRegisterErrors] = useState({})

  const passwordRequisitos = [
    { id: 'length', texto: 'Mínimo 8 caracteres', check: p => p.length >= 8 },
    { id: 'upper', texto: 'Al menos una mayúscula', check: p => /[A-Z]/.test(p) },
    { id: 'lower', texto: 'Al menos una minúscula', check: p => /[a-z]/.test(p) },
    { id: 'number', texto: 'Al menos un número', check: p => /[0-9]/.test(p) },
    { id: 'special', texto: 'Al menos un carácter especial (!@#$%...)', check: p => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ]

  const validarLogin = () => {
    const errors = {}
    if (!loginData.email) errors.email = 'El email es obligatorio'
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) errors.email = 'Email no válido'
    if (!loginData.password) errors.password = 'La contraseña es obligatoria'
    return errors
  }

  const validarRegistro = () => {
    const errors = {}
    if (!registerData.nombre || registerData.nombre.length < 3) {
      errors.nombre = 'El nombre debe tener al menos 3 caracteres'
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9]+$/.test(registerData.nombre)) {
      errors.nombre = 'El nombre contiene caracteres no permitidos: !@#$%^&*()_+={}[]|\\;:"<>,.?/~`'
    }
    if (!registerData.email) errors.email = 'El email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(registerData.email)) errors.email = 'Email no válido'
    const passwordOk = passwordRequisitos.every(r => r.check(registerData.password))
    if (!passwordOk) errors.password = 'La contraseña no cumple los requisitos'
    if (registerData.confirmPassword !== registerData.password) errors.confirmPassword = 'Las contraseñas no coinciden'
    return errors
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const errors = validarLogin()
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors)
      return
    }
    setLoginErrors({})
    console.log('Login:', loginData)
  }

  const handleRegistro = (e) => {
    e.preventDefault()
    const errors = validarRegistro()
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors)
      return
    }
    setRegisterErrors({})
    console.log('Registro:', registerData)
  }

  return (
    <div className="acceder-page">
      <h1 className="acceder-titulo">{esLogin ? 'Accede a tu cuenta' : 'Únete al Gremio'}</h1>
      <p className="acceder-subtitulo">{esLogin ? 'Bienvenido de nuevo, amante del pixel' : 'Crea tu cuenta y empieza a crear arte pixelado'}</p>

      <div className="acceder-contenido">
        <div className="acceder-form-container">
          {esLogin ? (
            <form className="acceder-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                />
                {loginErrors.email && <span className="form-error">{loginErrors.email}</span>}
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                />
                {loginErrors.password && <span className="form-error">{loginErrors.password}</span>}
              </div>
              <button type="submit" className="acceder-btn">Iniciar sesión</button>
              <p className="acceder-switch">
                ¿No tienes cuenta?{' '}
                <span onClick={() => setEsLogin(false)}>Únete al gremio</span>
              </p>
            </form>
          ) : (
            <form className="acceder-form" onSubmit={handleRegistro}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={registerData.nombre}
                  onChange={e => setRegisterData({ ...registerData, nombre: e.target.value })}
                />
                {registerErrors.nombre && <span className="form-error">{registerErrors.nombre}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                />
                {registerErrors.email && <span className="form-error">{registerErrors.email}</span>}
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                />
                {registerData.password && (
                  <ul className="password-requisitos">
                    {passwordRequisitos.map(r => (
                      <li key={r.id} className={r.check(registerData.password) ? 'cumplido' : 'pendiente'}>
                        {r.check(registerData.password) ? '✓' : '✗'} {r.texto}
                      </li>
                    ))}
                  </ul>
                )}
                {registerErrors.password && <span className="form-error">{registerErrors.password}</span>}
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                />
                {registerErrors.confirmPassword && <span className="form-error">{registerErrors.confirmPassword}</span>}
              </div>
              <button type="submit" className="acceder-btn">Crear cuenta</button>
              <p className="acceder-switch">
                ¿Ya tienes cuenta?{' '}
                <span onClick={() => setEsLogin(true)}>Iniciar sesión</span>
              </p>
            </form>
          )}
        </div>

        <div className="tablon-container">
          <div className="tablon-texto">
            <h2>Únete y gestiona tus encargos</h2>
          </div>
          <img src={tablon} alt="Tablón del Gremio" className="tablon-img" />
        </div>
      </div>
    </div>
  )
}

export default Acceder