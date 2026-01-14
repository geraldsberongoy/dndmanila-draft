"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion"
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

interface ParallaxProps {
  children: React.ReactNode
  baseVelocity: number
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
           <span key={i} className="block mr-0">{children}</span>
        ))}
      </motion.div>
    </div>
  )
}

const ITEMS = [
  "AUTHENTIC GUARANTEED",
  "WORLDWIDE SHIPPING",
  "SECURE PAYMENT",
  "VERIFIED SELLERS",
  "PREMIUM QUALITY",
  "MANILA'S FINEST",
]

export function Marquee() {
  return (
    <div className="bg-primary text-primary-foreground py-3 border-y border-white/10 overflow-hidden">
      <ParallaxText baseVelocity={-0.5}>
         <div className="flex items-center gap-8 px-4">
             {ITEMS.map((item, i) => (
               <div key={i} className="flex items-center gap-8">
                  <span className="text-sm font-bold tracking-[0.2em] font-display uppercase">
                    {item}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
               </div>
             ))}
         </div>
      </ParallaxText>
    </div>
  )
}
