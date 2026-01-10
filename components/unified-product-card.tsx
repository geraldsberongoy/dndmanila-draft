"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { ShoppingBag } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  href?: string
}

interface ProductCardProps {
  product: Product
}



export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      className="group relative w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={product.href || "#"} className="block h-full">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Floating Tag */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-black/80 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/10 shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Info appearing on hover/bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 z-20 translate-y-1 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h4 className="font-display text-sm md:text-2xl text-white tracking-wider mb-1 md:mb-2 drop-shadow-md">
              {product.name}
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-primary font-bold text-sm md:text-lg drop-shadow-sm">₱{product.price.toLocaleString()}</p>
              
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileHover={{ width: "auto", opacity: 1 }}
                className="h-px bg-primary"
              />
              <span className="text-[10px] md:text-xs text-white font-bold uppercase tracking-widest group-hover:text-primary transition-colors">View</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
