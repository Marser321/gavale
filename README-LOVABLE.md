# Guía de Integración Lovable ↔ Shopify

Este documento está diseñado ("en bandeja de plata") para que cualquier agente de IA (como Lovable) o desarrollador sepa exactamente cómo conectar el Front-End actual con el Backend de Shopify mediante la **Storefront API**.

La arquitectura ya está construida de manera modular. La landing actúa como una máscara visual conectada a un cliente "Mock" que automáticamente cambiará a entorno "Real" en cuanto detecte las variables de entorno de Shopify.

---

## 1. Variables de Entorno Requeridas

Para activar la conexión real a Shopify, debes establecer las siguientes variables de entorno en tu entorno de despliegue (Vercel, Lovable, Netlify, etc.) o en un archivo `.env` en la raíz del proyecto local:

```env
VITE_SHOPIFY_DOMAIN="mi-tienda-gavale.myshopify.com"
VITE_SHOPIFY_STOREFRONT_TOKEN="tu_storefront_access_token_aqui"
VITE_SHOPIFY_STORE_URL="https://gavalesportswear.com"
```

## 2. Arquitectura de Conexión (El "Puente")

El puente de conexión vive en el archivo **`src/lib/shopify.ts`**. 

### ¿Cómo funciona la Máscara Inteligente?
1. La función `isShopifyConfigured()` evalúa si existen las variables `SHOPIFY_DOMAIN` y `STOREFRONT_TOKEN`.
2. Si existen, `fetchProducts()` hace una llamada GraphQL (`POST` a `/api/2024-01/graphql.json`) usando la Storefront API oficial.
3. Si **NO** existen (como está sucediendo ahora en desarrollo), automáticamente carga un fallback llamado `getMockProducts()` que inyecta artículos de prueba (Aura Bandeau Set, etc.) para que la interfaz nunca se rompa.

### Transformación de Datos en `transformProduct`
La función interna `transformProduct(node)` toma la rígida estructura de GraphQL de Shopify (Edged/Nodes) y la convierte en nuestro modelo limpio `ShopifyProduct` (definido en `src/types/product.ts`). Aquí es donde generamos automáticamente los *Badges* o etiquetas (ej. *"Only X left"* o *"Just Dropped"*).

## 3. Consumo en los Componentes UI

El estado global de los productos se maneja vía React Hooks en **`src/hooks/useShopifyProducts.ts`**. 

Este hook se encarga del estado de Carga (`loading`) y Error (`error`), y divide automáticamente el inventario del backend en 3 listas útiles:
- `products`: Todos los productos.
- `newArrivals`: Productos con el badge "Just Dropped".
- `lowStock`: Productos con inventario bajo.

### Componentes que consumen esta data:
- **`FeaturedProducts.tsx`**: Pide la lista general (`products`) y los renderiza en un carrusel de tarjetas (`ProductCard.tsx`).
- **`JustDropped.tsx`**: Pide únicamente los `newArrivals` y esconde la sección automáticamente si no hay lanzamientos recientes.
- **`BentoGrid.tsx`**: Observa la propiedad `lowStock`. Si existe algún producto por agotarse, renderiza un "Live Stock Alert" dinámico para generar urgencia en tiempo real en la tarjeta roja parpadeante inferior (ej: *"Aura Bandeau Set: Only 7 left"*).

## 4. Instrucciones para Agentes Lovable (Next Steps)

Si eres un agente programador operando sobre esta base:
1. **No modifiques la UI**. El diseño (BentoGrid, HeroSection con los videos, Glassmorphism, etc.) ha sido aprobado estrictamente.
2. Si necesitas agregar campos nuevos de Shopify (ej. meta-campos especiales para tallas), agrégalos al query de GraphQL en `src/lib/shopify-queries.ts` y actualiza el mapeo en la función `transformProduct` (`shopify.ts`).
3. La URL oficial de los botones de pago (Checkout) actualmente se direcciona hacia `STORE_URL/products/{handle}`. Si vas a implementar un carrito lateral nativo (Hydrogen-style), deberás interceptar el click en `ProductCard.tsx` e invocar una mutación `cartCreate` en Shopify.
