import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { Dna, ShieldCheck, Activity, Droplets, Maximize } from 'lucide-react';
import './FeatureGrid.css';

export default function FeatureGrid() {
  const bentoCells = [
    {
      id: 'fabric',
      size: 'large',
      image: '/images/aura/aura_product_4.jpg', // Replace with an actual texture close-up or action shot
      label: 'MATERIAL PREMIUM',
      title: 'Second Skin Feel',
      description: 'Nuestro tejido de 4 capas se adapta a tu cuerpo como una segunda piel. Ligero, transpirable y diseñado para el máximo rendimiento.',
      icon: <Dna className="w-6 h-6" />,
    },
    {
      id: 'squat',
      size: 'medium',
      image: '/images/aura/aura_product_5.jpg',
      label: 'TRANQUILIDAD',
      title: '100% Squat-Proof',
      description: 'Entrena con total confianza. Tela de alto gramaje que garantiza la cero transparencia en cualquier movimiento.',
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      id: 'support',
      size: 'medium',
      image: '/images/aura/aura_product_6.jpg',
      label: 'COMODIDAD',
      title: 'Sculpting Support',
      description: 'Una pretina alta y ancha que esculpe tu core y suaviza las curvas naturales sin perder comodidad.',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      id: 'stretch',
      size: 'small',
      icon: <Maximize className="w-6 h-6 text-cta" />,
      title: '4-Way Stretch',
      description: 'Elasticidad superior para libertad de movimiento.',
    },
    {
      id: 'breathable',
      size: 'small',
      icon: <Droplets className="w-6 h-6 text-cta" />,
      title: 'Transpirable',
      description: 'Mantiene la piel fresca durante los entrenamientos.',
    },
  ];

  return (
    <section id="features" className="feature-grid section-padding">
      <div className="container">
        <ScrollReveal variant="slideUp">
          <div className="feature-grid__header">
            <span className="feature-grid__label">VENTAJA TECNOLÓGICA</span>
            <h2>Ingeniería <span className="text-accent">Aura</span></h2>
            <p>Diseñado para que nada te detenga. Descubre la ciencia detrás de la comodidad.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" stagger={0.12} className="feature-grid__grid">
          {bentoCells.map((cell) => (
            <motion.div
              key={cell.id}
              className={`feature-grid__cell feature-grid__cell--${cell.size} glass`}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {cell.image && (
                <div className="feature-grid__cell-image">
                  <img src={cell.image} alt={cell.title} loading="lazy" decoding="async" />
                  <div className="feature-grid__cell-image-overlay" />
                </div>
              )}
              <div className="feature-grid__cell-content">
                {cell.label && <span className="feature-grid__cell-label">{cell.label}</span>}
                <div className="feature-grid__cell-icon">{cell.icon}</div>
                <h3>{cell.title}</h3>
                <p>{cell.description}</p>
              </div>
            </motion.div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
