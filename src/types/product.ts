/* ═══════════════════════════════════════════
   Shopify Product Types
   ═══════════════════════════════════════════ */

export interface ProductImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  compareAtPrice: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: { name: string; value: string }[];
  image?: ProductImage;
}

export interface PriceRange {
  minVariantPrice: { amount: string; currencyCode: string };
  maxVariantPrice: { amount: string; currencyCode: string };
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  totalInventory: number | null;
  priceRange: PriceRange;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
  /* Computed fields */
  badge: string | null;
  isLowStock: boolean;
  hasDiscount: boolean;
  colorSwatches: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: ShopifyProduct[];
}
