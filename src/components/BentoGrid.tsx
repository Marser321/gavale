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
      label: 'TECHNOLOGY',
      title: '4-Layer Compression',
      description: 'You know that moment when you bend down and suddenly feel exposed? Never again. Our proprietary 4-layer weave eliminates transparency while delivering sculpting compression that moves with your body.',
      icon: <Dna className="w-6 h-6" />,
    },
    {
      id: 'support',
      size: 'medium',
      image: '/images/product_aura_set_1.webp',
      label: 'INNOVATION',
      title: 'Strapless Support',
      description: 'We spent 14 months engineering a strapless bra that actually stays put — yes, even during burpees. The Aura Bandeau defies physics so you don\'t have to.',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: 'style',
      size: 'medium',
      image: '/images/lifestyle_escalator_lilac.webp',
      label: 'VERSATILITY',
      title: 'Gym to Street',
      description: 'Your leggings should look as good at Whole Foods as they do at CrossFit. Minimal, elevated, powerful — pieces designed for women who refuse to compromise.',
      icon: <Shirt className="w-6 h-6" />,
    },
    {
      id: 'shipping',
      size: 'small',
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Shipping',
      description: 'On orders over $100',
    },
    {
      id: 'secure',
      size: 'small',
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure Payment',
      description: '256-bit SSL encrypted',
    },
    {
      id: 'returns',
      size: 'small',
      icon: <RotateCcw className="w-6 h-6" />,
      title: 'Easy Returns',
      description: '30-day hassle-free',
    },
    {
      id: 'rompers',
      size: 'medium',
      video: '/videos/new_arrivals.mp4',
      label: 'MUST-HAVE',
      title: 'Seamless Rompers',
      description: 'One piece, zero distractions. Built for high-intensity movement with butter-soft fabric.',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      id: 'zips',
      size: 'medium',
      image: '/images/top_black_zip.jpg',
      label: 'NEW DROPS',
      title: 'Define Jackets',
      description: 'The perfect layering piece that snatches your waist and elevates your gym aesthetic instantly.',
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  return (
    <section id="bento" className="bento section-padding">
      <div className="container">
        <ScrollReveal variant="slideUp">
          <div className="bento__header">
            <span className="bento__label">THE EXPERIENCE</span>
            <h2>Crafted for <span className="text-accent">Confidence</span></h2>
            <p>Every stitch, every fiber, every detail — engineered for women who demand more.</p>
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
            <span>{stockAlert.title}: Only {stockAlert.count} left</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
