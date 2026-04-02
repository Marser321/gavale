import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Verified, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import './RealityWall.css';

const filters = [
  { id: 'all', label: 'Todas las Reseñas' },
  { id: 'aura-set', label: 'Aura Set' },
  { id: 'jumpsuits', label: 'Jumpsuits' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'sets', label: 'Otros Sets' }
];

export default function RealityWall() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTestimonials = testimonials.filter((t) => 
    activeFilter === 'all' ? true : t.category === activeFilter
  );

  return (
    <section id="reality-wall" className="reality-wall section-padding">
      <div className="container">
        
        <div className="reality-wall__header">
          <motion.span 
            className="reality-wall__label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            GAVALE IN REAL LIFE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Nuestras clientas <span className="text-accent">son la prueba</span>
          </motion.h2>

          {/* Filters */}
          <motion.div 
            className="reality-wall__filters"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`reality-wall__filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          className="reality-wall__grid"
          layout
        >
          <AnimatePresence>
            {filteredTestimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="reality-wall__item"
              >
                <div className="reality-wall__image-wrapper">
                  <img src={testimonial.image_url} alt={`Review by ${testimonial.name}`} loading="lazy" />
                  
                  {/* Hover Overlay */}
                  <div className="reality-wall__overlay">
                    <div className="reality-wall__overlay-content">
                      <div className="reality-wall__stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-gold text-gold' : 'text-gray-400'}`} />
                        ))}
                      </div>
                      <p className="reality-wall__review-text">"{testimonial.text}"</p>
                      
                      <div className="reality-wall__meta">
                        <span className="reality-wall__product">{testimonial.product}</span>
                        <div className="reality-wall__customer">
                          <span className="reality-wall__name">{testimonial.name}</span>
                          <span className="reality-wall__verified">
                            <Verified className="w-3 h-3" /> Compra Verificada
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
