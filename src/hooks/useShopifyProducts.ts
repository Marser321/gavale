/* ═══════════════════════════════════════════
   React Hook — useShopifyProducts
   ═══════════════════════════════════════════ */

import { useEffect, useState } from 'react';
import type { ShopifyProduct } from '../types/product';
import { fetchProducts, fetchCollection } from '../lib/shopify';

interface UseShopifyProductsOptions {
  collection?: string;
  count?: number;
  filterTags?: string[];
}

interface UseShopifyProductsReturn {
  products: ShopifyProduct[];
  loading: boolean;
  error: string | null;
  bestSellers: ShopifyProduct[];
  newArrivals: ShopifyProduct[];
  lowStock: ShopifyProduct[];
}

export function useShopifyProducts(
  options: UseShopifyProductsOptions = {}
): UseShopifyProductsReturn {
  const { collection, count = 12, filterTags } = options;
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        let data: ShopifyProduct[];
        if (collection) {
          data = await fetchCollection(collection, count);
        } else {
          data = await fetchProducts(count);
        }

        // Optional tag filter
        if (filterTags && filterTags.length > 0) {
          data = data.filter(p =>
            filterTags.some(tag => p.tags.includes(tag))
          );
        }

        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [collection, count, filterTags?.join(',')]);

  // Computed subsets
  const bestSellers = products.filter(
    p => p.tags.includes('best-seller') || p.badge === 'Best Seller'
  );

  const newArrivals = products.filter(p => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return new Date(p.createdAt).getTime() > thirtyDaysAgo || p.badge === 'Just Dropped';
  });

  const lowStock = products.filter(p => p.isLowStock);

  return { products, loading, error, bestSellers, newArrivals, lowStock };
}
