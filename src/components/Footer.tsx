import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {

  const footerLinks = [
    { title: 'Tienda', links: ['Novedades', 'Más Vendidos', 'Conjuntos', 'Leggings', 'Sostenes Deportivos'] },
    { title: 'Ayuda', links: ['Envíos', 'Devoluciones', 'Guía de Tallas', 'Preguntas Frecuentes', 'Contacto'] },
    { title: 'Compañía', links: ['Sobre Nosotros', 'Empleos', 'Prensa', 'Tiendas', 'Venta al por Mayor'] },
  ];

  const socials = [
    { name: 'Instagram', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: 'https://www.instagram.com/gavalesportswear/' },
    { name: 'TikTok', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>, href: 'https://www.tiktok.com/@gavalesportswear' },
    { name: 'Facebook', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, href: '#' },
    { name: 'Pinterest', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="12" x2="12" y2="22"></line><path d="M12 2A9.9 9.9 0 0 0 2 12c0 4.2 2.6 7.8 6.2 9.4A20 20 0 0 1 7.1 16z"></path><path d="M7.1 16l1.2-4.5c.2-.7 1.2-2.1 3.5-2.1s4 1.7 4 3.7c0 2.2-1.3 3.6-2.9 3.6s-2.7-1.4-2.2-2.9l1.4-5.3c.3-1 .8-1.5 2.1-1.5 1.5 0 4.1 1.2 4.1 4.5 0 3.7-3.1 8-7.9 8-3.5 0-5.7-2.3-5.7-5.5 0-3.3 2.1-5.6 4.9-5.6s4.1 2.5 4.1 5.3"></path></svg>, href: '#' },
  ];

  return (
    <footer id="footer" className="footer">

      {/* Footer Grid */}
      <div className="footer__main container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              src="/images/gavale_logo_full.png"
              alt="Gavale Sportswear"
              className="footer__logo"
            />
            <p className="footer__tagline">
              Estilo que se mueve contigo. Diseñado para mujeres que no se conforman.
            </p>
            <div className="footer__socials">
              {socials.map(s => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-icon"
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  aria-label={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map(group => (
            <div key={group.title} className="footer__link-group">
              <h4>{group.title}</h4>
              <ul>
                {group.links.map(link => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          {/* SVG Trust Badges */}
          <div className="footer__trust-badges">
            <span className="footer__trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Seguridad SSL
            </span>
            <span className="footer__trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Todas las Tarjetas Aceptadas
            </span>
            <span className="footer__trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Envío Gratis sobre $100
            </span>
          </div>

          <div className="footer__shopify-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Pago seguro impulsado por Shopify
          </div>

          <p className="footer__copyright">
            © {new Date().getFullYear()} Gavale Sportswear. Todos los derechos reservados. | gavalesportswear@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
