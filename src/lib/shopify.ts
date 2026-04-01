/* ═══════════════════════════════════════════════════════
   Shopify Storefront API Client — with Mock Fallback
   ═══════════════════════════════════════════════════════ */

import type { ShopifyProduct } from '../types/product';
import { PRODUCTS_QUERY, COLLECTION_QUERY } from './shopify-queries';

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || '';
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const STORE_URL = import.meta.env.VITE_SHOPIFY_STORE_URL || 'https://gavalesportswear.com';

export const isShopifyConfigured = (): boolean =>
  Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);

export const getStoreUrl = (): string => STORE_URL;

/* ── GraphQL fetch ───────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function shopifyFetch(query: string, variables: Record<string, any> = {}): Promise<any> {
  const url = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

/* ── Transform Shopify response → our types ──────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformProduct(node: any): ShopifyProduct {
  const variants = node.variants.edges.map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    price: e.node.price?.amount || e.node.price,
    compareAtPrice: e.node.compareAtPrice?.amount || e.node.compareAtPrice,
    availableForSale: e.node.availableForSale,
    quantityAvailable: e.node.quantityAvailable,
    selectedOptions: e.node.selectedOptions,
    image: e.node.image,
  }));

  const images = node.images.edges.map((e: any) => e.node);
  const totalInventory = node.totalInventory ?? variants.reduce(
    (sum: number, v: any) => sum + (v.quantityAvailable ?? 0), 0
  );
  const isLowStock = totalInventory !== null && totalInventory > 0 && totalInventory < 10;

  const hasDiscount = variants.some(
    (v: any) => v.compareAtPrice && parseFloat(v.compareAtPrice) > parseFloat(v.price)
  );

  // Determine badge
  const isNew = (Date.now() - new Date(node.createdAt).getTime()) < 30 * 24 * 60 * 60 * 1000;
  let badge: string | null = null;
  if (isLowStock) badge = `Only ${totalInventory} left`;
  else if (node.tags?.includes('best-seller')) badge = 'Best Seller';
  else if (isNew) badge = 'Just Dropped';
  else if (hasDiscount) badge = 'Sale';

  // Extract color swatches from variant options
  const colorSwatches = [...new Set(
    variants
      .flatMap((v: any) => v.selectedOptions)
      .filter((o: any) => o.name.toLowerCase() === 'color')
      .map((o: any) => o.value)
  )] as string[];

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    vendor: node.vendor,
    productType: node.productType,
    tags: node.tags || [],
    availableForSale: node.availableForSale,
    totalInventory,
    priceRange: node.priceRange,
    images,
    variants,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
    badge,
    isLowStock,
    hasDiscount,
    colorSwatches,
  };
}

/* ── Public API ──────────────────────────────────── */

export async function fetchProducts(count = 12): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured()) return getMockProducts();

  try {
    const data = await shopifyFetch(PRODUCTS_QUERY, { first: count });
    return data.products.edges.map((e: any) => transformProduct(e.node));
  } catch (err) {
    console.warn('Shopify API unavailable, using mock data:', err);
    return getMockProducts();
  }
}

export async function fetchCollection(handle: string, count = 12): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured()) return getMockProducts();

  try {
    const data = await shopifyFetch(COLLECTION_QUERY, { handle, first: count });
    return data.collectionByHandle.products.edges.map((e: any) => transformProduct(e.node));
  } catch (err) {
    console.warn('Shopify collection fetch failed, using mock data:', err);
    return getMockProducts();
  }
}

export function getProductUrl(handle: string): string {
  return `${STORE_URL}/products/${handle}`;
}

/* ═══════════════════════════════════════════════════════
   MOCK DATA — Realistic Gavale products for fallback
   ═══════════════════════════════════════════════════════ */

function getMockProducts(): ShopifyProduct[] {
  return [
    {
      id: 'mock-1',
      handle: 'aura-bandeau-set',
      title: 'Aura Bandeau Set',
      description: 'Minimal. Elevated. Powerful without effort. Strapless bra & leggings set designed for effortless confidence.',
      vendor: 'Gavale Sportswear',
      productType: 'Sets',
      tags: ['best-seller', 'sets'],
      availableForSale: true,
      totalInventory: 7,
      priceRange: {
        minVariantPrice: { amount: '69.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '69.99', currencyCode: 'USD' },
      },
      images: [
        { url: '/images/product_aura_set_1.webp', altText: 'Aura Bandeau Set front' },
        { url: '/images/product_aura_set_2.webp', altText: 'Aura Bandeau Set back' },
      ],
      variants: [
        { id: 'v1a', title: 'Lilac / S', price: '69.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 3, selectedOptions: [{ name: 'Color', value: 'Lilac' }, { name: 'Size', value: 'S' }] },
        { id: 'v1b', title: 'Black / S', price: '69.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 4, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'S' }] },
      ],
      createdAt: '2025-11-15T10:00:00Z',
      updatedAt: '2026-03-28T10:00:00Z',
      badge: 'Only 7 left',
      isLowStock: true,
      hasDiscount: false,
      colorSwatches: ['Lilac', 'Black'],
    },
    {
      id: 'mock-2',
      handle: 'cross-mini-jumpsuit',
      title: 'Cross Mini Jumpsuit',
      description: 'One-piece performance meets all-day style. Cross-back design with seamless compression.',
      vendor: 'Gavale Sportswear',
      productType: 'Jumpsuits',
      tags: ['new-arrival', 'jumpsuits'],
      availableForSale: true,
      totalInventory: 24,
      priceRange: {
        minVariantPrice: { amount: '59.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '59.99', currencyCode: 'USD' },
      },
      images: [
        { url: '/images/cat_cross_mini_jumpsuit.webp', altText: 'Cross Mini Jumpsuit' },
        { url: '/images/lifestyle_white_romper.jpg', altText: 'Cross Mini Jumpsuit lifestyle' },
      ],
      variants: [
        { id: 'v2a', title: 'White / M', price: '59.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 12, selectedOptions: [{ name: 'Color', value: 'White' }, { name: 'Size', value: 'M' }] },
        { id: 'v2b', title: 'Black / M', price: '59.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 12, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'M' }] },
      ],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      badge: 'Just Dropped',
      isLowStock: false,
      hasDiscount: false,
      colorSwatches: ['White', 'Black'],
    },
    {
      id: 'mock-3',
      handle: 'silhouette-scrunch-leggings',
      title: 'Silhouette Scrunch',
      description: 'High-waist scrunch leggings with 4-layer anti-transparency compression. Sculpts and supports.',
      vendor: 'Gavale Sportswear',
      productType: 'Leggings',
      tags: ['best-seller', 'leggings'],
      availableForSale: true,
      totalInventory: 18,
      priceRange: {
        minVariantPrice: { amount: '45.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '49.99', currencyCode: 'USD' },
      },
      images: [
        { url: '/images/cat_silhouette_scrunch_leggings.webp', altText: 'Silhouette Scrunch Leggings' },
        { url: '/images/lifestyle_red_grass.jpg', altText: 'Silhouette Scrunch lifestyle' },
      ],
      variants: [
        { id: 'v3a', title: 'Green / S', price: '49.99', compareAtPrice: '59.99', availableForSale: true, quantityAvailable: 9, selectedOptions: [{ name: 'Color', value: 'Green' }, { name: 'Size', value: 'S' }] },
        { id: 'v3b', title: 'Red / M', price: '45.99', compareAtPrice: '55.99', availableForSale: true, quantityAvailable: 9, selectedOptions: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'M' }] },
      ],
      createdAt: '2025-09-01T10:00:00Z',
      updatedAt: '2026-03-20T10:00:00Z',
      badge: 'Sale',
      isLowStock: false,
      hasDiscount: true,
      colorSwatches: ['Green', 'Red'],
    },
    {
      id: 'mock-4',
      handle: 'v-back-leggings',
      title: 'V-Back Leggings',
      description: 'Sculpting V-back waistband design. Flattering fit from every angle.',
      vendor: 'Gavale Sportswear',
      productType: 'Leggings',
      tags: ['leggings'],
      availableForSale: true,
      totalInventory: 32,
      priceRange: {
        minVariantPrice: { amount: '49.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '49.99', currencyCode: 'USD' },
      },
      images: [
        { url: '/images/cat_v_back_leggings.webp', altText: 'V-Back Leggings' },
        { url: '/images/lifestyle_brown_beach.jpg', altText: 'V-Back Leggings lifestyle' },
      ],
      variants: [
        { id: 'v4a', title: 'Black / S', price: '49.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 16, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'S' }] },
        { id: 'v4b', title: 'Brown / M', price: '49.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 16, selectedOptions: [{ name: 'Color', value: 'Brown' }, { name: 'Size', value: 'M' }] },
      ],
      createdAt: '2025-10-15T10:00:00Z',
      updatedAt: '2026-03-25T10:00:00Z',
      badge: null,
      isLowStock: false,
      hasDiscount: false,
      colorSwatches: ['Black', 'Brown'],
    },
    {
      id: 'mock-5',
      handle: 'valentines-set',
      title: "Valentine's Set",
      description: 'Limited edition set. Bold color, soft fabric, perfect fit.',
      vendor: 'Gavale Sportswear',
      productType: 'Sets',
      tags: ['limited-edition', 'sets'],
      availableForSale: true,
      totalInventory: 4,
      priceRange: {
        minVariantPrice: { amount: '65.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '65.99', currencyCode: 'USD' },
      },
      images: [
        { url: '/images/cat_valentines_set.webp', altText: "Valentine's Set" },
        { url: '/images/lifestyle_red_grass.jpg', altText: "Valentine's Set lifestyle" },
      ],
      variants: [
        { id: 'v5a', title: 'Red / S', price: '65.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 2, selectedOptions: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'S' }] },
        { id: 'v5b', title: 'Red / M', price: '65.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 2, selectedOptions: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'M' }] },
      ],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      badge: 'Only 4 left',
      isLowStock: true,
      hasDiscount: false,
      colorSwatches: ['Red'],
    },
    {
      id: 'mock-6',
      handle: 'energy-bra-set',
      title: 'Energy Bra Set',
      description: 'Medium-support sports bra with matching leggings. Breathable mesh panels.',
      vendor: 'Gavale Sportswear',
      productType: 'Sets',
      tags: ['sets', 'best-seller'],
      availableForSale: true,
      totalInventory: 15,
      priceRange: {
        minVariantPrice: { amount: '69.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '69.99', currencyCode: 'USD' },
      },
      images: [
        { url: '/images/lifestyle_black_set.jpg', altText: 'Energy Bra Set' },
        { url: '/images/lifestyle_winter_jacket_black.webp', altText: 'Energy Bra Set lifestyle' },
      ],
      variants: [
        { id: 'v6a', title: 'Black / S', price: '69.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 8, selectedOptions: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'S' }] },
        { id: 'v6b', title: 'Gray / M', price: '69.99', compareAtPrice: null, availableForSale: true, quantityAvailable: 7, selectedOptions: [{ name: 'Color', value: 'Gray' }, { name: 'Size', value: 'M' }] },
      ],
      createdAt: '2025-08-01T10:00:00Z',
      updatedAt: '2026-03-26T10:00:00Z',
      badge: 'Best Seller',
      isLowStock: false,
      hasDiscount: false,
      colorSwatches: ['Black', 'Gray'],
    },
  ];
}
