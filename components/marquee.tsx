"use client"

import { useEffect, useRef } from "react"

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
    <div className="bg-primary text-primary-foreground overflow-hidden py-3 border-y border-primary-foreground/10 select-none">
      <div className="flex animate-scroll-x w-[200%]">
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
            <span className="text-sm font-bold tracking-[0.2em] font-display">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
          </div>
        ))}
      </div>
    </div>
  )
}
