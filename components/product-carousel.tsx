
"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/unified-product-card"
import { allProducts } from "@/lib/data"

export function ProductCarousel() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  
  // Use a subset of products for the carousel
  const products = allProducts.slice(0, 6).map(p => ({
     ...p,
     // Ensure props match Product interface of ProductCard
     href: `/shop/${p.category}/${p.id}`
  }))
  
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  const slide = (direction: "left" | "right") => {
    const moveAmount = 400
    const currentX = x.get()
    let newX = direction === "left" ? currentX + moveAmount : currentX - moveAmount
    
    // Clamp values
    if (newX > 0) newX = 0
    if (newX < -width) newX = -width
    
    animate(x, newX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    })
  }

  return (
    <div className="relative group/carousel">
      {/* Navigation - Visible on Hover */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => slide("left")}
          className="p-3 bg-black/50 backdrop-blur-md text-white rounded-r-lg hover:bg-primary hover:text-black transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => slide("right")}
          className="p-3 bg-black/50 backdrop-blur-md text-white rounded-l-lg hover:bg-primary hover:text-black transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <motion.div ref={carousel} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          style={{ x }}
          className="flex gap-4 md:gap-8 px-4 py-8"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[calc(50vw-24px)] bg-red-300 md:w-[320px]">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
