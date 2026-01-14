
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
  {
    id: "nike-dunk-low-grey-fog",
    name: "Nike Dunk Low Grey Fog",
    brand: "Nike",
    price: 7800,
    image: "/nike-dunk-low-grey-fog-sneaker.png",
    category: "shoes",
  },
  {
    id: "asics-gel-kayano-14",
    name: "Asics Gel-Kayano 14",
    brand: "Asics",
    price: 9200,
    image: "/asics-gel-kayano-14-cream-silver-sneaker.png",
    category: "shoes",
  },
  {
    id: "salomon-xt-6",
    name: "Salomon XT-6",
    brand: "Salomon",
    price: 11500,
    image: "/salomon-xt-6-black-sneaker.png",
    category: "shoes",
  },
]

export const apparelProducts: Product[] = [
  {
    id: "essentials-hoodie-black",
    name: "Fear of God Essentials Hoodie",
    brand: "Essentials",
    price: 3200,
    image: "/black-oversized-hoodie-streetwear-product-flat-lay.jpg",
    onBodyImage: "/black-oversized-hoodie-on-model-urban-street.jpg",
    category: "apparel",
  },
  {
    id: "supreme-box-logo-tee",
    name: "Supreme Box Logo Tee",
    brand: "Supreme",
    price: 4500,
    image: "/black-graphic-t-shirt-manila-streetwear-product.jpg",
    onBodyImage: "/placeholder.svg?height=400&width=400",
    category: "apparel",
  },
  {
    id: "kith-cargo-pants",
    name: "Kith Mercer Cargo Pants",
    brand: "Kith",
    price: 6800,
    image: "/cargo-pants.png",
    onBodyImage: "/cargo-pants.png",
    category: "apparel",
  },
  {
    id: "stussy-windbreaker",
    name: "Stussy Graffiti Windbreaker",
    brand: "Stussy",
    price: 5200,
    image: "/windbreaker.png",
    onBodyImage: "/windbreaker.png",
    category: "apparel",
  },
  {
    id: "essentials-track-pants",
    name: "Essentials Track Pants",
    brand: "Essentials",
    price: 2800,
    image: "/track-pants.png",
    onBodyImage: "/track-pants.png",
    category: "apparel",
  },
  {
    id: "supreme-camp-cap",
    name: "Supreme Camp Cap",
    brand: "Supreme",
    price: 2200,
    image: "/premium-cap.png",
    onBodyImage: "/premium-cap.png",
    category: "apparel",
  },
]

export const allProducts: Product[] = [...shoesProducts, ...apparelProducts, ...vaultProducts]

export const FOOTWEAR_BRANDS = [
  {
    id: "jordan",
    name: "JORDAN",
    image: "/air-jordan-1-on-foot-street-style.jpg",
    href: "/shop/shoes?brand=jordan",
    description: "Flight Heritage"
  },
  {
    id: "nike",
    name: "NIKE",
    image: "/nike-dunk-low-panda-sneaker.jpg",
    href: "/shop/shoes?brand=nike",
    description: "Swoosh Icons"
  },
  {
    id: "new-balance",
    name: "NEW BALANCE",
    image: "/new-balance-574-on-foot-lifestyle-shot.jpg",
    href: "/shop/shoes?brand=new+balance",
    description: "Dad Shoe Est."
  },
  {
    id: "adidas",
    name: "ADIDAS",
    image: "/adidas-samba-on-foot-casual-wear.jpg",
    href: "/shop/shoes?brand=adidas",
    description: "Three Stripes"
  },
]

export const APPAREL_BRANDS = [
  {
    id: "essentials",
    name: "ESSENTIALS",
    image: "/essentials-hoodie.png",
    href: "/shop/apparel?brand=essentials",
    description: "The New Standard"
  },
  {
    id: "supreme",
    name: "SUPREME",
    image: "/supreme-streetwear.png",
    href: "/shop/apparel?brand=supreme",
    description: "World Famous"
  },
  {
    id: "kith",
    name: "KITH",
    image: "/kith-lifestyle.png",
    href: "/shop/apparel?brand=kith",
    description: "Just Us"
  },
  {
    id: "stussy",
    name: "STUSSY",
    image: "/stussy-retro.png",
    href: "/shop/apparel?brand=stussy",
    description: "International Tribe"
  },
]
