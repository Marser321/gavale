import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import './BrandStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="brand-story" className="brand-story" ref={sectionRef}>
      <div className="brand-story__parallax" ref={parallaxRef}>
        <video
          src="/videos/blue_smile.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="brand-story__parallax-overlay" />
      </div>

      <div className="brand-story__content container">
        <div className="brand-story__grid">
          <ScrollReveal variant="slideRight" className="brand-story__text">
            <span className="brand-story__label">OUR STORY</span>
            <h2>Miami-Born.<br /><span className="text-accent">Globally Driven.</span></h2>
            <p>
              Gavale Sportswear was born from a simple belief: every woman deserves athletic
              wear that performs as hard as she does — without sacrificing an ounce of style.
            </p>
            <p>
              From our flagship stores in Miami's Dolphin Mall and Sawgrass Mills to wardrobes
              across the Americas, we're redefining what it means to feel powerful in what you wear.
            </p>

            <div className="brand-story__locations">
              <div className="brand-story__location glass">
                <div className="brand-story__location-pin">📍</div>
                <div>
                  <strong>Dolphin Mall</strong>
                  <span>11401 NW 12th St, Miami</span>
                </div>
              </div>
              <div className="brand-story__location glass">
                <div className="brand-story__location-pin">📍</div>
                <div>
                  <strong>Sawgrass Mills</strong>
                  <span>12801 W Sunrise Blvd, Sunrise</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideLeft" className="brand-story__image-col">
            <div className="brand-story__image-stack">
              <video
                src="/videos/red_jumpsuit.mp4"
                className="brand-story__img brand-story__img--main"
                autoPlay
                loop
                muted
                playsInline
              />
              <img
                src="/images/store_interior_1.jpg"
                alt="Gavale store interior"
                className="brand-story__img brand-story__img--float glass"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
