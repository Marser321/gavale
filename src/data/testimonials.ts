export interface Testimonial {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  product: string;
  variant: string;
  category: 'aura-set' | 'jumpsuits' | 'jackets' | 'sets' | 'other';
  image_url: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Yunislaidy M.",
    date: "3/27/2026",
    rating: 5,
    text: "Amo me encantó, la tela súper buena recomendado 100%",
    product: "The Backline Set",
    variant: "Red / M",
    category: "sets",
    image_url: "/images/social-proof/1X6BYbumv.jpg"
  },
  {
    id: "t2",
    name: "Isabel R.",
    date: "12/05/2025",
    rating: 5,
    text: "Me encanta la tela, súper suave y cómoda",
    product: "Aura Bandeau Set",
    variant: "Navy / S",
    category: "aura-set",
    image_url: "/images/social-proof/5rubcDrAy.jpg"
  },
  {
    id: "t3",
    name: "Claudia G.",
    date: "03/05/2026",
    rating: 5,
    text: "Súper recomendado para el gym y para salir",
    product: "Cross Mini Jumpsuit",
    variant: "Blue / S",
    category: "jumpsuits",
    image_url: "/images/social-proof/cDVAtdZlb.jpg"
  },
  {
    id: "t4",
    name: "Maria C.",
    date: "01/12/2026",
    rating: 5,
    text: "El ajuste es perfecto, realza mucho la figura",
    product: "Aura Bandeau Set",
    variant: "Black / M",
    category: "aura-set",
    image_url: "/images/social-proof/MK1tAnpLU_mid.jpg"
  },
  {
    id: "t5",
    name: "Anamaura S.",
    date: "5/14/2025",
    rating: 5,
    text: "Excelente calidad ♥️",
    product: "Countour Series Set",
    variant: "Pink / S",
    category: "sets",
    image_url: "/images/social-proof/tNIlQvjAB.jpg"
  },
  {
    id: "t6",
    name: "Dina V.",
    date: "10/27/2025",
    rating: 5,
    text: "Excelente Producto !!! Buena Calidad Amo el Color Gracias Todo Fue Un Éxito ☘️ 🥳",
    product: "All-Weather Puffer Jacket",
    variant: "Pink / M",
    category: "jackets",
    image_url: "/images/social-proof/VQp4PLMqU_mid.jpg"
  }
];
