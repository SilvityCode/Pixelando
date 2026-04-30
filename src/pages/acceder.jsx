import './acceder.css'
import { useState } from 'react'
import tablon from '../assets/tablon.png'

function Acceder() {
  const [esLogin, setEsLogin] = useState(true)

  return (
    <div className="acceder-page">
      <h1 className="acceder-titulo">{esLogin ? 'Accede a tu cuenta' : 'Únete al Gremio'}</h1>
      <p className="acceder-subtitulo">{esLogin ? 'Bienvenido de nuevo, amante del pixel' : 'Crea tu cuenta y empieza a crear arte pixelado'}</p>

      <div className="acceder-contenido">
        <div className="acceder-form-container">
          {esLogin ? (
            <form className="acceder-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="tu@email.com" />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <button type="submit" className="acceder-btn">Iniciar sesión</button>
              <p className="acceder-switch">
                ¿No tienes cuenta?{' '}
                <span onClick={() => setEsLogin(false)}>Únete al gremio</span>
              </p>
            </form>
          ) : (
            <form className="acceder-form">
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" placeholder="Tu nombre" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="tu@email.com" />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input type="password" placeholder="••••••••" />
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