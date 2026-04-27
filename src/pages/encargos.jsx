import './encargos.css'
import { useSearchParams } from 'react-router-dom'

const rarezas = ['comun', 'raro', 'epico', 'legendario']
const rarezasNombres = {
  comun: 'Común — 6€',
  raro: 'Raro — 15€',
  epico: 'Épico — 30€',
  legendario: 'Legendario — desde 20€'
}

function Encargos() {
  const [searchParams] = useSearchParams()
  const rarezaInicial = searchParams.get('rareza') || 'comun'

  return (
    <div className="encargos-page">
      <h1 className="encargos-titulo">Hacer un Encargo</h1>
      <p className="encargos-subtitulo">Rellena el formulario y te contactamos en menos de 24h</p>

      <form className="encargos-form">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="tu@email.com" />
        </div>

        <div className="form-group">
          <label>Rareza</label>
          <select defaultValue={rarezaInicial}>
            {rarezas.map(r => (
              <option key={r} value={r}>{rarezasNombres[r]}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Descripción del diseño</label>
          <textarea placeholder="Describe qué quieres, personaje, colores, referencias..." rows={4} />
        </div>

        <div className="form-group">
          <label>Enlace de referencia (opcional)</label>
          <input type="text" placeholder="Pinterest, Instagram, Google Images..." />
        </div>

        <div className="form-group">
            <label>Foto de referencia (opcional)</label>
            <input type="file" accept="image/*" className="file-input" />
        </div>

        <button type="submit" className="encargos-btn">Enviar encargo</button>
      </form>
    </div>
  )
}

export default Encargos