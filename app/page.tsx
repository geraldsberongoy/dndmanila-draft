import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ProductCarousel } from "@/components/product-carousel"
import { HeroProductSlideshow } from "@/components/hero-product-slideshow"
import { Marquee } from "@/components/marquee"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroProductSlideshow />

        {/* Hero Content */}
        <div className="relative z-10 text-center space-y-10 px-6 max-w-5xl mx-auto mix-blend-screen">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display tracking-wider text-balance drop-shadow-2xl">
              <span className="text-white block">Shoes & Apparel.</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary animate-pulse block">
                Elevated.
              </span>
            </h1>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-forwards">
            <Link href="/vault">
              <Button
                size="lg"
                className="text-base px-6 py-4 md:text-lg md:px-8 md:py-6 bg-primary text-black hover:bg-white hover:text-black tracking-wide shadow-[0_0_20px_-5px_var(--primary)] transition-all duration-300"
              >
                Pre-Order Drops
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-6 py-4 md:text-lg md:px-8 md:py-6 border-2 border-white text-white hover:bg-white hover:text-primary tracking-wide backdrop-blur-sm bg-black/20"
              >
                Shop All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Featured Products with Glow */}
      <section className="py-32 px-6 border-b border-white/5 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-full">
          <div className="flex items-end justify-between mb-12 md:px-12">
            <div>
              <span className="text-primary tracking-widest text-sm font-bold uppercase mb-2 block">Curated Selection</span>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-wide leading-none text-white">
                Trending Now
              </h3>
            </div>
            <Link href="/shop" className="group flex items-center gap-3 text-white hover:text-primary transition-colors pb-2">
              <span className="hidden md:block text-lg uppercase tracking-widest font-bold">View All</span>
              <div className="p-2 border border-white/20 rounded-full group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>

          <ProductCarousel />
        </div>
      </section>

      {/* Featured Drop Preview - More Pop */}
      <section className="py-32 px-6 bg-secondary/5 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex lg:flex-row flex-col-reverse gap-10 lg:gap-16 items-center justify-center">
            <div className="relative group perspective-1000 order-2 lg:order-1 flex-1 w-full flex justify-center">
              {/* Decorative elements behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-border/20 rotate-45 z-0 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <img
                src="/nike-air-jordan-1-travis-scott-sneaker-product-sho.jpg"
                alt="Featured drop"
                className="relative z-10 w-full max-w-lg mx-auto shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2 border-4 border-white transform-gpu"
              />

              {/* Float badge */}
              <div className="absolute -bottom-6 -right-6 z-20 bg-black border border-white/20 p-6 shadow-xl">
                 <div className="text-center">
                    <div className="text-xs text-primary uppercase tracking-widest mb-1">Stock Left</div>
                    <div className="text-3xl font-display">12 PAIRS</div>
                 </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 order-1 lg:order-2 relative z-20 flex-1">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary text-black font-bold tracking-widest text-sm uppercase mb-4 md:mb-6">
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  Upcoming Release
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-4 md:mb-6">
                  TRAVIS SCOTT <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">JORDAN 1</span>
                </h2>
                
                <p className="text-lg text-muted-foreground/80 max-w-md leading-relaxed">
                  The most anticipated drop of the season. 
                  Get exclusive access and secure your pair before the public release.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 py-6 md:py-8 border-y border-white/10">
                 <div>
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Release Date</span>
                    <span className="text-2xl font-display">FEB 15</span>
                 </div>
                 <div>
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Retail Price</span>
                    <span className="text-2xl font-display">₱32,000</span>
                 </div>
              </div>

              <div className="flex gap-4">
                <Link href="/vault/jordan-1-retro" className="flex-1">
                  <Button size="lg" className="w-full h-14 text-lg bg-primary text-black hover:bg-white hover:text-black tracking-wide transition-all">
                    Secure Spot
                  </Button>
                </Link>
                <Link href="/vault/jordan-1-retro">   
                  <div className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
             
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
