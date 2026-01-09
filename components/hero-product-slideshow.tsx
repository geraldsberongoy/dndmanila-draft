"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const IMAGES = [
  "/air-jordan-1-on-foot-street-style.jpg",
  "/adidas-samba-og-on-foot.jpg",
  "/nike-air-max-90-on-foot-urban-street.jpg",
  "/new-balance-574-on-foot-lifestyle-shot.jpg", 
  "/converse-chuck-70-on-foot-casual-style.jpg"
]

export function HeroProductSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-black select-none pointer-events-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={IMAGES[index]}
            alt="Product Showcase"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays for readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/60" />
    </div>
  )
}
