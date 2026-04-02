import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './UGCWall.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    image: '/images/real_review_1.jpg',
    name: 'Yunislaidy M.',
    text: 'Amo me encantó, la tela súper buena recomendado 100%',
    stars: 5,
    product: 'The Backline Set',
    variant: 'Peach / S',
    verified: true,
  },
  {
    image: '/images/customer_green_set.jpg',
    name: 'Valentina R.',
    text: 'Me encanta el diseño minimalista. El bandeau tiene un soporte increíble, no pensé que fuera posible sin tirantes.',
    stars: 5,
    product: 'Aura Bandeau Set',
    variant: 'Mint / M',
    verified: true,
  },
  {
    image: '/images/real_review_2.jpg',
    name: 'Agueda B.',
    text: '¡Me encanta el color y el ajuste!',
    stars: 5,
    product: 'Oversized Jacket',
    variant: 'S / Mint',
    verified: true,
  },
  {
    image: '/images/lifestyle_escalator_lilac.webp',
    name: 'Camila S.',
    text: 'Los leggings son lo mejor que he probado. No se transparentan y el ajuste es perfecto. Ya quiero más colores.',
    stars: 5,
    product: 'Silhouette Scrunch',
    variant: 'Black / S',
    verified: true,
  },
  {
    image: '/images/real_review_3.jpg',
    name: 'Lorena S.',
    text: 'Amo este set',
    stars: 5,
    product: 'Cozy 3 Piece set',
    variant: 'Black / L',
    verified: true,
  },
  {
    image: '/images/customer_white_top.jpg',
    name: 'Sofía M.',
    text: 'Lo compré para el gym y termino usándolo todos los días. La tela es divina, no da calor.',
    stars: 5,
    product: 'Cross Mini Jumpsuit',
    variant: 'White / S',
    verified: true,
  },
  {
    image: '/images/real_review_4.jpg',
    name: 'Yadira S.',
    text: 'Me encanta lo amé',
    stars: 5,
    product: 'All-Weather Puffer Jacket',
    variant: 'Pink / L',
    verified: true,
  },
  {
    image: '/images/real_review_5.jpg',
    name: 'Yadira S.',
    text: 'Súper',
    stars: 5,
    product: 'Great Wall Set',
    variant: 'Burgundy / L',
    verified: true,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="ugc__stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="ugc__star flex items-center justify-center">
          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
        </span>
      ))}
    </div>
  );
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      onEnter: () => {
        const dur = 2000;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / dur, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      once: true,
    });
    return () => trigger.kill();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
}

export default function UGCWall() {
  return (
    <section id="reviews" className="ugc section-padding">
      <div className="container">
        <ScrollReveal variant="slideUp">
          <div className="ugc__header">
            <span className="ugc__label">COMUNIDAD</span>
            <h2>Mujeres Reales, <span className="text-accent">Confianza</span> Real</h2>

            {/* Rating summary */}
            <div className="ugc__rating-bar flex items-center gap-2">
              <div className="ugc__rating-score flex items-center">
                <span className="ugc__rating-number font-bold text-lg">4.9</span>
                <span className="ugc__rating-of text-sm text-gray-500">/5</span>
              </div>
              <div className="ugc__rating-stars flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="ugc__rating-count text-sm text-gray-500">Basado en 847 reseñas verificadas</span>
            </div>

            <p className="ugc__counter-text">
              Únete a <strong className="text-gold"><Counter target={10000} /></strong> mujeres que entrenan con Gavale
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Infinite Marquee Carousel */}
      <div className="ugc__marquee">
        <div className="ugc__marquee-track">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="ugc__card">
              <div className="ugc__card-image">
                <img src={t.image} alt={`Review by ${t.name}`} loading="lazy" decoding="async" />
                <div className="ugc__card-overlay glass">
                  <Stars count={t.stars} />
                  <p className="ugc__card-text">"{t.text}"</p>
                  <div className="ugc__card-meta">
                    <span className="ugc__card-name">{t.name}</span>
                    {t.verified && (
                      <span className="ugc__card-verified">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        VERIFICADA
                      </span>
                    )}
                  </div>
                  <span className="ugc__card-product">{t.product}</span>
                  {t.variant && <span className="ugc__card-variant">{t.variant}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
