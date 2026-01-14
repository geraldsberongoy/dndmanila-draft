"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export interface BrandItem {
  id: string
  name: string
  image: string
  href: string
  description: string
}

interface BrandGridProps {
  prefix?: string
  highlight?: string
  items: BrandItem[]
}

export function BrandGrid({ 
  prefix = "Shop by", 
  highlight = "Silhouette", 
  items 
}: BrandGridProps) {
  return (
    <section className="py-24 px-4 bg-white/5 border-b border-white/5">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-12">
          <div>
             <span className="text-primary tracking-widest text-sm font-bold uppercase mb-2 block">The Vault</span>
            <h3 className="text-4xl md:text-6xl font-display uppercase text-white leading-none">
              {prefix} <span className="text-muted-foreground">{highlight}</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((brand, i) => (
            <Link key={brand.id} href={brand.href} className="group relative block h-[500px] overflow-hidden rounded-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full w-full"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-secondary">
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                     <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                           {brand.description}
                        </span>
                        <h2 className="text-4xl font-display text-white uppercase tracking-wider relative inline-block">
                          {brand.name}
                          <span className="absolute -right-6 top-0 text-white/0 group-hover:text-primary transition-colors duration-300">
                            <ArrowUpRight className="w-5 h-5" />
                          </span>
                        </h2>
                     </div>
                  </div>
                </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
