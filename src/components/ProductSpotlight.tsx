import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductSpotlight.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.spotlight__row');
      
      rows.forEach((row) => {
        const image = row.querySelector('.spotlight__image-wrapper');
        const content = row.querySelector('.spotlight__content');

        gsap.fromTo(
          image,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding spotlight-section" id="spotlight" ref={containerRef}>
      <div className="container">
        <div className="spotlight__header text-center">
          <span className="hero__badge">¿POR QUÉ LO AMARÁS?</span>
          <h2 className="spotlight__title">Diseñado en los detalles</h2>
          <p className="spotlight__subtitle">
            Cada costura y panel ha sido cuidadosamente diseñado para ofrecer un rendimiento invisible y una comodidad absoluta.
          </p>
        </div>

        {/* Top Details */}
        <div className="spotlight__row glass">
          <div className="spotlight__image-wrapper">
            <img src="/images/aura/aura_product_2.jpg" alt="Aura Bandeau Top detail" className="spotlight__image" />
          </div>
          <div className="spotlight__content">
            <h3 className="spotlight__item-title">El Top Bandeau</h3>
            <p className="spotlight__item-desc">
              Confeccionado en tela de <strong>Compresión Suave</strong> que abraza el contorno de tu cuerpo sin clavarse. Su diseño strapless minimalista ofrece un <strong>soporte seguro</strong> para impacto bajo o medio.
            </p>
            <ul className="spotlight__features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Sensación "Second Skin"
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Mantenimiento firme sin tirantes
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Logo sutil premium
              </li>
            </ul>
          </div>
        </div>

        {/* Leggings Details */}
        <div className="spotlight__row spotlight__row--reverse glass">
          <div className="spotlight__image-wrapper">
            <img src="/images/aura/aura_product_3.jpg" alt="Aura Leggings detail" className="spotlight__image" />
          </div>
          <div className="spotlight__content">
            <h3 className="spotlight__item-title">Los Leggings</h3>
            <p className="spotlight__item-desc">
              Cintura alta con una <strong>pretina que esculpe</strong> (sculpting waistband) para dar soporte al core y resaltar tus curvas. El frente <strong>sin costuras</strong> evita fricción creando un ajuste limpio.
            </p>
            <ul className="spotlight__features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Totalmente Squat-Proof
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Pretina alta "Escultora"
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cta)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Tela transpirable premium
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
