
export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  onFootImage?: string // For shoes
  onBodyImage?: string // For apparel
  images?: string[] // For gallery
  category: "shoes" | "apparel" | "vault"
  description?: string
  dropDate?: string
  slots?: number
  totalSlots?: number
}

export const vaultProducts: Product[] = [
  {
    id: "jordan-1-retro",
    name: "Air Jordan 1 Retro High OG",
    brand: "Jordan",
    price: 12500,
    image: "/air-jordan-1-retro-high-og-studio-product-shot.jpg",
    images: ["/air-jordan-1-retro-high-og-studio-product-shot.jpg", "/air-jordan-1-on-foot-street-style.jpg"],
    dropDate: "Feb 15, 2026",
    slots: 12,
    totalSlots: 50,
    description: "The Air Jordan 1 needs no introduction. As one of the most iconic silhouettes in sneaker history.",
    category: "vault",
  },
  {
    id: "dunk-low-panda",
    name: "Nike Dunk Low Panda",
    brand: "Nike",
    price: 8900,
    image: "/nike-dunk-low-panda-sneaker.jpg",
    images: ["/nike-dunk-low-panda-sneaker.jpg"],
    dropDate: "Feb 20, 2026",
    slots: 28,
    totalSlots: 75,
    description: "A street staple. The Panda Dunk Low brings monochrome versatility to any fit.",
    category: "vault",
  },
  {
    id: "yeezy-350",
    name: "Adidas Yeezy Boost 350 V2",
    brand: "Adidas",
    price: 15000,
    image: "/yeezy-350-v2-sneaker.jpg",
    images: ["/yeezy-350-v2-sneaker.jpg"],
    dropDate: "Feb 25, 2026",
    slots: 5,
    totalSlots: 30,
    description: "Unmatched comfort with the Boost sole. The 350 V2 remains a modern classic.",
    category: "vault",
  },
  {
    id: "nb-990v6",
    name: "New Balance 990v6 Grey",
    brand: "New Balance",
    price: 11200,
    image: "/new-balance-990v6-grey-sneaker.jpg",
    images: ["/new-balance-990v6-grey-sneaker.jpg", "/new-balance-574-on-foot-lifestyle-shot.jpg"],
    dropDate: "Mar 1, 2026",
    slots: 42,
    totalSlots: 60,
    description: "The latest evolution of the 990 series. Featuring FuelCell foam and a sleek, modern design without compromising heritage.",
    category: "vault",
  }
]

export const shoesProducts: Product[] = [
  {
    id: "nike-air-max-90",
    name: "Nike Air Max 90",
    brand: "Nike",
    price: 7500,
    image: "/nike-air-max-90-white-sneaker-product-shot.jpg",
    onFootImage: "/nike-air-max-90-on-foot-urban-street.jpg",
    category: "shoes",
  },
  {
    id: "adidas-samba-og",
    name: "Adidas Samba OG",
    brand: "Adidas",
    price: 6200,
    image: "/adidas-samba-og-black-white-sneaker-product.jpg",
    onFootImage: "/adidas-samba-on-foot-casual-wear.jpg",
    category: "shoes",
  },
  {
    id: "new-balance-574",
    name: "New Balance 574",
    brand: "New Balance",
    price: 5800,
    image: "/new-balance-574-grey-sneaker-product-shot.jpg",
    onFootImage: "/new-balance-574-on-foot-lifestyle-shot.jpg",
    category: "shoes",
  },
  {
    id: "jordan-1-retro-high",
    name: "Jordan 1 Retro High",
    brand: "Nike",
    price: 9500,
    image: "/air-jordan-1-red-black-sneaker-product.jpg",
    onFootImage: "/air-jordan-1-on-foot-street-style.jpg",
    category: "shoes",
  },
  {
    id: "vans-old-skool",
    name: "Vans Old Skool",
    brand: "Vans",
    price: 4200,
    image: "/vans-old-skool-black-white-sneaker-product.jpg",
    onFootImage: "/vans-old-skool-on-foot-skateboard.jpg",
    category: "shoes",
  },
  {
    id: "converse-chuck-70",
    name: "Converse Chuck 70",
    brand: "Converse",
    price: 4800,
    image: "/converse-chuck-70-high-top-cream-sneaker.jpg",
    onFootImage: "/converse-chuck-70-on-foot-casual-style.jpg",
    category: "shoes",
  },
]

export const apparelProducts: Product[] = [
  {
    id: "oversized-street-hoodie",
    name: "Oversized Street Hoodie",
    brand: "DND MNL",
    price: 3200,
    image: "/black-oversized-hoodie-streetwear-product-flat-lay.jpg",
    onBodyImage: "/black-oversized-hoodie-on-model-urban-street.jpg",
    category: "apparel",
  },
  {
    id: "manila-nights-tee",
    name: "Manila Nights Tee",
    brand: "DND MNL",
    price: 1500,
    image: "/black-graphic-t-shirt-manila-streetwear-product.jpg",
    onBodyImage: "/placeholder.svg?height=400&width=400",
    category: "apparel",
  },
  {
    id: "cargo-pants",
    name: "Cargo Pants",
    brand: "Urban Essentials",
    price: 2800,
    image: "/cargo-pants.png",
    onBodyImage: "/cargo-pants.png",
    category: "apparel",
  },
  {
    id: "windbreaker-jacket",
    name: "Windbreaker Jacket",
    brand: "Street Core",
    price: 4200,
    image: "/windbreaker.png",
    onBodyImage: "/windbreaker.png",
    category: "apparel",
  },
  {
    id: "track-pants",
    name: "Track Pants",
    brand: "Urban Essentials",
    price: 2200,
    image: "/track-pants.png",
    onBodyImage: "/track-pants.png",
    category: "apparel",
  },
  {
    id: "premium-cap",
    name: "Premium Cap",
    brand: "DND MNL",
    price: 1200,
    image: "/premium-cap.png",
    onBodyImage: "/premium-cap.png",
    category: "apparel",
  },
]

export const allProducts: Product[] = [...shoesProducts, ...apparelProducts, ...vaultProducts]
