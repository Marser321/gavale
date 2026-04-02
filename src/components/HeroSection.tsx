import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on hero image
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text entrance — word-by-word kinetic reveal
      const words = headlineRef.current?.querySelectorAll('.hero__word');
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        trustRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.5, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = 'Minimal. Elevated. Effortlessly Powerful.';
  const words = headline.split(' ');

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      <div className="hero__bg" ref={imgRef}>
        <video
          src="/videos/gavale_web.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero__video"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <div className="hero__badge">NUESTRO PRODUCTO ESTRELLA</div>

        <h1 className="hero__headline" ref={headlineRef} style={{ perspective: '1000px' }}>
          {words.map((word, i) => (
            <span key={i} className="hero__word">{word} </span>
          ))}
        </h1>

        {/* PAS Copy: Problem → Agitation → Solution */}
        <p className="hero__sub" ref={subRef}>
          Confianza sin esfuerzo. Líneas limpias, soporte que esculpe tu figura y una sensación de "segunda piel". El <strong>Aura Bandeau Set</strong> es todo lo que necesitas.
        </p>

        <div className="hero__cta-group" ref={ctaRef}>
          <MagneticButton href="#conversion-zone" className="btn-primary btn-hero">
            Obtén tu Aura Set
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </MagneticButton>
        </div>

        {/* Trust micro-copy */}
        <div className="hero__trust" ref={trustRef}>
          <span className="hero__trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            14-Day Hassle-Free Exchanges
          </span>
          <span className="hero__trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Squat-Proof
          </span>
          <span className="hero__trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Premium Second Skin Fabric
          </span>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span>Deslizar</span>
      </div>
    </section>
  );
}
