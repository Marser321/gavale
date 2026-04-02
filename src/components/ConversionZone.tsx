import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Check, Truck, RotateCcw } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './ConversionZone.css';

const colors = [
  { id: 'red', name: 'Cherry Red', hex: '#b31b1b', img: '/images/product_aura_set_1.webp' },
  { id: 'navy', name: 'Midnight Navy', hex: '#1a2436', img: '/images/aura/aura_product_7.jpg' },
  { id: 'black', name: 'Onyx Black', hex: '#1a1a1a', img: '/images/aura/aura_product_8.jpg' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function ConversionZone() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState('S');

  return (
    <section id="conversion-zone" className="conversion section-padding">
      <div className="container">
        <div className="conversion__grid">
          {/* Images Wrapper */}
          <div className="conversion__visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="conversion__image-container glass"
              >
                <img 
                  src={selectedColor.img} 
                  alt={`Aura Set en ${selectedColor.name}`} 
                  className="conversion__main-img" 
                />
                <div className="conversion__badge">STOCK LIMITADO</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Checkout Wrapper */}
          <div className="conversion__checkout glass">
            <div className="checkout__header">
              <span className="checkout__tag">EL SET PERFECTO</span>
              <h2>Aura Bandeau Set</h2>
              <div className="checkout__price-row">
                <span className="checkout__price">$69.99 USD</span>
                <span className="checkout__shipping-note">Envío gratis sobre $100</span>
              </div>
            </div>

            {/* Colors */}
            <div className="checkout__section">
              <div className="checkout__label-group">
                <span className="checkout__label">Color:</span>
                <span className="checkout__value">{selectedColor.name}</span>
              </div>
              <div className="checkout__colors">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`checkout__color-btn ${selectedColor.id === color.id ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Seleccionar ${color.name}`}
                  >
                    {selectedColor.id === color.id && <Check className="w-4 h-4 checkout__color-check" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="checkout__section">
              <div className="checkout__label-group">
                <span className="checkout__label">Talla:</span>
                <button className="checkout__size-guide">Guía de tallas</button>
              </div>
              <div className="checkout__sizes">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`checkout__size-btn ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="checkout__action">
              <MagneticButton href="#" className="btn-primary checkout__btn w-full justify-center">
                Obtén tu Aura Set
              </MagneticButton>
            </div>

            {/* Trust Badges */}
            <div className="checkout__trust">
              <div className="checkout__trust-item">
                <RotateCcw className="w-5 h-5 text-cta" />
                <span>14 Días para Retornos y Cambios</span>
              </div>
              <div className="checkout__trust-item">
                <Truck className="w-5 h-5 text-cta" />
                <span>Envíos Seguros a Todo E.E.U.U.</span>
              </div>
              <div className="checkout__trust-item">
                <ShieldCheck className="w-5 h-5 text-cta" />
                <span>Pago y Transacción Protegida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
