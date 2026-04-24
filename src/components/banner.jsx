import './banner.css'

function Banner() {
  const texto = '✦ HAMA BEADS ✦ HECHO A MANO ✦ ENCARGOS ✦ PIXEL ART ✦ ENVÍOS ✦'

  return (
    <div className="banner">
      <div className="banner-track">
        <span>{texto}</span>
        <span>{texto}</span>
        <span>{texto}</span>
      </div>
    </div>
  )
}

export default Banner