import './footer.css'
import { FaInstagram} from 'react-icons/fa'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Dirección</h3>
          <p>C/ de ejemplo, 4, 60500.</p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>📧 hola@pixelando.es</p>
          <p>📞 +34 600 000 000</p>
          <p>📍 Murcia, España</p>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <p><FaInstagram /> Pixelando</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Pixelando. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer