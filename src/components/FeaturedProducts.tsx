import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { getProductUrl } from '../lib/shopify';
import type { ShopifyProduct } from '../types/product';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  const { bestSellers, products, loading } = useShopifyProducts();

  // Use best-sellers first, then fall back to all products, pick top 4
  const featured = bestSellers.length >= 4
    ? bestSellers.slice(0, 4)
    : products.slice(0, 4);

  return (
    <section id="collections" className="products section-padding">
      <div className="container">
        <ScrollReveal variant="slideUp">
          <div className="products__header">
            <span className="products__label">COLECCIONES</span>
            <h2><span className="text-gold">Más Vendidos</span> Destacados</h2>
            <p>Piezas que nuestra comunidad no puede dejar de usar.</p>

            {/* Rating summary */}
            <div className="products__rating-summary flex items-center gap-2">
              <span className="products__stars-inline flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </span>
              <span>4.9/5 basado en <strong>847 reseñas</strong></span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" stagger={0.15} className="products__grid">
          {loading ? (
            // Skeleton placeholders while loading
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="product-card product-card--skeleton">
                <div className="product-card__image-wrapper skeleton-pulse" />
                <div className="product-card__info">
                  <div className="skeleton-line skeleton-line--title" />
                  <div className="skeleton-line skeleton-line--subtitle" />
                  <div className="skeleton-line skeleton-line--price" />
                </div>
              </div>
            ))
          ) : (
            featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const [hovered, setHovered] = useState(false);

  const img1 = product.images[0]?.url || '';
  const img2 = product.images[1]?.url || img1;
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);

  // Compare-at price (if discount exists)
  const firstVariant = product.variants[0];
  const comparePrice = firstVariant?.compareAtPrice
    ? parseFloat(firstVariant.compareAtPrice).toFixed(2)
    : null;

  return (
    <motion.a
      href={getProductUrl(product.handle)}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="product-card__image-wrapper">
        <img
          src={img1}
          alt={product.title}
          className={`product-card__img product-card__img--front ${hovered ? 'hide' : ''}`}
          loading="lazy"
          decoding="async"
        />
        <img
          src={img2}
          alt={`${product.title} lifestyle`}
          className={`product-card__img product-card__img--back ${hovered ? 'show' : ''}`}
          loading="lazy"
          decoding="async"
        />

        {/* Dynamic badge */}
        {product.badge && (
          <motion.span
            className={`product-card__badge flex items-center gap-1 ${
              product.isLowStock ? 'product-card__badge--urgent' :
              product.hasDiscount ? 'product-card__badge--sale' :
              product.badge === 'Just Dropped' ? 'product-card__badge--new' : ''
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            {product.isLowStock && <Flame className="w-3 h-3" />} {product.badge}
          </motion.span>
        )}

        {/* Quick-add overlay */}
        <motion.div
          className="product-card__quick-add"
          initial={{ opacity: 0, y: 10 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <span className="product-card__quick-add-btn flex items-center justify-center gap-2">
            Agregar a la Bolsa <ArrowRight className="w-4 h-4" />
          </span>
        </motion.div>
      </div>

      <div className="product-card__info">
        <h3>{product.title}</h3>
        <p className="product-card__subtitle">{product.productType}</p>

        <div className="product-card__price-row">
          <span className="product-card__price">${price}</span>
          {comparePrice && (
            <span className="product-card__compare-price">${comparePrice}</span>
          )}
        </div>

        {/* Color swatches */}
        {product.colorSwatches.length > 0 && (
          <div className="product-card__swatches">
            {product.colorSwatches.map(color => (
              <span
                key={color}
                className="product-card__swatch"
                data-color={color.toLowerCase()}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}
