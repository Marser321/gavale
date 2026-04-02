import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './GallerySection.css';

export default function GallerySection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isHovered) return;

    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // If we reached the end, loop back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 3500); // 3.5s interval

    return () => clearInterval(intervalId);
  }, [isHovered]);

  const images = [
    { src: '/images/aura/aura_product_7.jpg', alt: 'Aura Set Navy Edit 1' },
    { src: '/images/aura/aura_product_8.jpg', alt: 'Aura Set Black Edit 1' },
    { src: '/images/aura/aura_product_9.jpg', alt: 'Aura Set Navy Edit 2' },
    { src: '/images/aura/aura_product_10.jpg', alt: 'Aura Set Black Edit 2' },
    { src: '/images/aura/aura_product_11.jpg', alt: 'Aura Set Navy Edit 3' },
    { src: '/images/aura/aura_product_12.jpg', alt: 'Aura Set Black Edit 3' }
  ];

  return (
    <section id="gallery" className="gallery section-padding">
      <div className="container">
        <div className="gallery__header">
          <div className="gallery__title-wrapper">
            <span className="gallery__label">MÁS ALLÁ DEL ROJO</span>
            <h2>Colección <span className="text-accent">Aura Essentials</span></h2>
            <p>Descubre los tonos Navy y Black. El mismo rendimiento premium, listos para combinarlos con tu rutina diaria.</p>
          </div>
          
          <div className="gallery__controls">
            <button onClick={() => scroll('left')} className="gallery__btn" aria-label="Anterior">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => scroll('right')} className="gallery__btn" aria-label="Siguiente">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="gallery__carousel-wrapper">
          <div 
            className="gallery__carousel" 
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsHovered(false), 2000);
            }}
          >
            {images.map((img, idx) => (
              <motion.div 
                key={idx} 
                className="gallery__item glass"
                whileHover={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
