import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Tienda', href: '#collections' },
    { label: 'Nosotros', href: '#brand-story' },
    { label: 'Reseñas', href: '#reviews' },
    { label: 'Contacto', href: '#footer' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <img src="/images/gavale_logo_full.png" alt="Gavale Sportswear" />
        </a>

        <ul className="navbar__links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="navbar__link">{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="https://gavalesportswear.com" target="_blank" rel="noopener noreferrer" className="navbar__cta btn-primary">
          Comprar Ahora
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu glass"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="https://gavalesportswear.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>
              Comprar Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
