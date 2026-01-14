"use client"

import { motion } from "framer-motion"

const ITEMS = [
  "AUTHENTIC GUARANTEED",
  "WORLDWIDE SHIPPING",
  "SECURE PAYMENT",
  "VERIFIED SELLERS",
  "PREMIUM QUALITY",
  "MANILA'S FINEST",
]

export function Marquee() {
  const repeatedItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden py-3 border-y border-primary-foreground/10 select-none flex">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {repeatedItems.map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <span className="text-sm font-bold tracking-[0.2em] font-display">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
          </div>
        ))}
      </motion.div>
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {repeatedItems.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <span className="text-sm font-bold tracking-[0.2em] font-display">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
