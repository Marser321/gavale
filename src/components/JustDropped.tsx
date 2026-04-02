import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { getProductUrl } from '../lib/shopify';
import type { ShopifyProduct } from '../types/product';
import './JustDropped.css';

export default function JustDropped() {
  const { newArrivals, loading } = useShopifyProducts();

  // Fallback: if no new arrivals from API, use a curated subset
  const items: ShopifyProduct[] = newArrivals.length > 0
    ? newArrivals.slice(0, 3)
    : [];

  if (loading || items.length === 0) return null;

  return (
    <section id="just-dropped" className="just-dropped section-padding">
      <div className="container">
        <ScrollReveal variant="slideUp">
          <div className="just-dropped__header">
            <span className="just-dropped__label">RECIÉN LLEGADO</span>
            <h2>
              Nuevos <span className="text-gold">Lanzamientos</span>
            </h2>
            <p>Nuevos estilos que no durarán mucho. Consíguelos antes de que se agoten.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" stagger={0.15} className="just-dropped__rail">
          {items.map((product) => (
            <DropCard key={product.id} product={product} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

function DropCard({ product }: { product: ShopifyProduct }) {
  const price = product.priceRange.minVariantPrice.amount;
  const img = product.images[0]?.url || '';
  const img2 = product.images[1]?.url || img;

  return (
    <motion.a
      href={getProductUrl(product.handle)}
      target="_blank"
      rel="noopener noreferrer"
      className="drop-card"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="drop-card__image">
        <img src={img} alt={product.title} className="drop-card__img drop-card__img--1" loading="lazy" decoding="async" />
        <img src={img2} alt={`${product.title} alternate`} className="drop-card__img drop-card__img--2" loading="lazy" decoding="async" />
        <motion.span
          className="drop-card__badge"
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="drop-card__badge-shimmer" />
          NUEVO
        </motion.span>
        {product.isLowStock && product.totalInventory && (
          <span className="drop-card__stock-alert flex items-center justify-center gap-1">
            <Flame className="w-3 h-3" /> Solo quedan {product.totalInventory}
          </span>
        )}
      </div>
      <div className="drop-card__info">
        <h3>{product.title}</h3>
        <p className="drop-card__type">{product.productType}</p>
        <span className="drop-card__price">${parseFloat(price).toFixed(2)}</span>
        {product.colorSwatches.length > 0 && (
          <div className="drop-card__swatches">
            {product.colorSwatches.map(color => (
              <span key={color} className="drop-card__swatch" data-color={color.toLowerCase()} title={color} />
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}
