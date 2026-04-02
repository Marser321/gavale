import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { Flame, Dna, Sparkles, Shirt, Truck, Lock, RotateCcw, Activity, Heart } from 'lucide-react';
import './BentoGrid.css';

export default function BentoGrid() {
  const { lowStock } = useShopifyProducts();

  // Build a stock alert message if any product is low
  const stockAlert = lowStock.length > 0
    ? { title: lowStock[0].title, count: lowStock[0].totalInventory }
    : null;

  const bentoCells = [
    {
      id: 'fabric',
      size: 'large',
      video: '/videos/maryan_fit.mp4',
      label: 'TECNOLOGÍA',
      title: 'Compresión de 4 Capas',
      description: '¿Conoces ese momento en que te agachas y de repente te sientes expuesta? Nunca más. Nuestro tejido patentado de 4 capas elimina la transparencia mientras brinda una compresión moldeadora que se mueve con tu cuerpo.',
      icon: <Dna className="w-6 h-6" />,
    },
    {
      id: 'support',
      size: 'medium',
      image: '/images/product_aura_set_1.webp',
      label: 'INNOVACIÓN',
      title: 'Soporte Sin Tirantes',
      description: 'Pasamos 14 meses diseñando un sostén sin tirantes que realmente se mantiene en su lugar, sí, incluso durante los burpees. El Bandeau Aura desafía la física para que no tengas que hacerlo.',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: 'style',
      size: 'medium',
      image: '/images/lifestyle_escalator_lilac.webp',
      label: 'VERSATILIDAD',
      title: 'Del Gimnasio a la Calle',
      description: 'Tus leggings deberían verse tan bien en el supermercado como en el CrossFit. Minimalistas, elegantes, poderosas: piezas diseñadas para mujeres que no se conforman.',
      icon: <Shirt className="w-6 h-6" />,
    },
    {
      id: 'shipping',
      size: 'small',
      icon: <Truck className="w-6 h-6" />,
      title: 'Envío Gratis',
      description: 'En pedidos sobre $100',
    },
    {
      id: 'secure',
      size: 'small',
      icon: <Lock className="w-6 h-6" />,
      title: 'Pago Seguro',
      description: 'Encriptación SSL de 256 bits',
    },
    {
      id: 'returns',
      size: 'small',
      icon: <RotateCcw className="w-6 h-6" />,
      title: 'Devoluciones Fáciles',
      description: '30 días sin complicaciones',
    },
    {
      id: 'rompers',
      size: 'medium',
      video: '/videos/new_arrivals.mp4',
      label: 'IMPRESCINDIBLE',
      title: 'Enterizos Sin Costuras',
      description: 'Una pieza, cero distracciones. Diseñado para movimientos de alta intensidad con tela suave como la mantequilla.',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      id: 'zips',
      size: 'medium',
      image: '/images/top_black_zip.jpg',
      label: 'NUEVOS LANZAMIENTOS',
      title: 'Chaquetas Define',
      description: 'La capa perfecta que moldea tu cintura y eleva la estética de tu gimnasio al instante.',
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  return (
    <section id="bento" className="bento section-padding">
      <div className="container">
        <ScrollReveal variant="slideUp">
          <div className="bento__header">
            <span className="bento__label">LA EXPERIENCIA</span>
            <h2>Diseñado para la <span className="text-accent">Confianza</span></h2>
            <p>Cada puntada, cada fibra, cada detalle: diseñado para mujeres que exigen más.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" stagger={0.12} className="bento__grid">
          {bentoCells.map(cell => (
            <motion.div
              key={cell.id}
              className={`bento__cell bento__cell--${cell.size} glass`}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {cell.video ? (
                <div className="bento__cell-image">
                  <video src={cell.video} autoPlay loop muted playsInline />
                  <div className="bento__cell-image-overlay" />
                </div>
              ) : cell.image ? (
                <div className="bento__cell-image">
                  <img src={cell.image} alt={cell.title} loading="lazy" decoding="async" />
                  <div className="bento__cell-image-overlay" />
                </div>
              ) : null}
              <div className="bento__cell-content">
                {cell.label && <span className="bento__cell-label">{cell.label}</span>}
                <div className="bento__cell-icon">{cell.icon}</div>
                <h3>{cell.title}</h3>
                <p>{cell.description}</p>
              </div>
            </motion.div>
          ))}
        </ScrollReveal>

        {/* Dynamic stock alert from Shopify */}
        {stockAlert && (
          <motion.div
            className="bento__stock-alert flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{stockAlert.title}: Solo quedan {stockAlert.count}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
