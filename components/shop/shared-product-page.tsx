"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { allProducts } from "@/lib/data"
import { notFound, useRouter } from "next/navigation"
import { ArrowLeft, Check, Truck, ShieldCheck, HelpCircle, ChevronLeft, ChevronRight, ShoppingCart, Ruler } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/lib/cart-context"
import { TrustTimeline } from "@/components/trust-timeline"

interface SharedProductPageProps {
    category: "shoes" | "apparel" | "vault"
    id: string
}

export function SharedProductPage({ category, id }: SharedProductPageProps) {
  const product = allProducts.find(
    (p) => p.category === category && p.id === id
  )
  const { addItem, deselectAll } = useCart()
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isBuying, setIsBuying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product, selectedSize)
  }

  const handleBuy = () => {
    if (!selectedSize) return
    setIsBuying(true)
    
    // Direct checkout flow using query params
    // This skips the cart state for "Buy Now" / "Pre-Order" immediate actions
    const params = new URLSearchParams({
        product: product.id,
        size: selectedSize,
        category: product.category
    })
    
    router.push(`/checkout?${params.toString()}`)
  }

  const rawImages = [
    product.image, 
    category === "shoes" || category === "vault" ? product.onFootImage : product.onBodyImage,
    ...(product.images || []), 
    product.image 
  ].filter(Boolean) as string[]

  const uniqueImages = Array.from(new Set(rawImages))
  const images = uniqueImages.length > 0 ? uniqueImages : ["/placeholder.svg"]
  const galleryImages = images.length === 1 ? [images[0], images[0]] : images

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const sizes = category === "apparel" 
    ? ["S", "M", "L", "XL", "XXL"]
    : ["US 7", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 12", "US 13"]

  const isVault = category === "vault"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <Link href={isVault ? "/vault" : `/shop/${category}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="uppercase tracking-widest text-xs font-bold">Back to {isVault ? "Vault" : category}</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Panel - Image Gallery */}
            <div className="lg:col-span-7">
              <div className="sticky top-32 space-y-4">
                <div className="bg-secondary/30 rounded-lg overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentImageIndex} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative aspect-square md:aspect-[4/3]"
                    >
                      <img 
                          src={galleryImages[currentImageIndex]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <div className="absolute inset-y-0 left-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button 
                      onClick={prevImage}
                      className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button 
                      onClick={nextImage}
                      className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Image indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {galleryImages.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`transition-all duration-300 h-1.5 rounded-full shadow-sm ${
                          idx === currentImageIndex ? "w-8 bg-primary" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Angle View Thumbnails */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {galleryImages.map((img, idx) => (
                      <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex 
                              ? "border-primary opacity-100" 
                              : "border-transparent opacity-50 hover:opacity-100"
                          }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Product Details - Right Panel */}
            <div className="lg:col-span-5 space-y-10">
               <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        {isVault ? (
                            <>
                                <div className="px-3 py-1 bg-primary text-black font-bold tracking-widest text-xs uppercase rounded-sm">
                                    Pre-Order Vault
                                </div>
                                {(product.slots ?? 0) < 10 && (
                                    <span className="text-destructive text-sm font-bold tracking-wider uppercase animate-pulse">
                                        Low Stock Alert
                                    </span>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="px-3 py-1 bg-white text-black font-bold tracking-widest text-xs uppercase rounded-sm">
                                    In Stock
                                </div>
                                <span className="text-primary text-sm font-bold tracking-wider uppercase animate-pulse">
                                    Ready to Ship
                                </span>
                            </>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display leading-tight text-white uppercase text-balance tracking-wide">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-8 py-6 border-y border-white/10">
                        <div>
                            <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Price</span>
                            <span className="text-3xl font-display text-primary">₱{product.price.toLocaleString()}</span>
                        </div>
                        <div className="h-10 w-px bg-white/10" />
                        <div>
                           <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">{isVault ? "Drop Date" : "Brand"}</span>
                           <span className="text-xl font-display text-white">{isVault ? (product.dropDate || "TBA") : product.brand}</span>
                        </div>
                    </div>
               </div>

                {/* Size Selector */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold tracking-wider uppercase text-white">Select Size</span>
                        <span className="text-xs text-muted-foreground underline cursor-pointer hover:text-white uppercase tracking-widest">Size Guide</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                        {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        relative py-3 px-1 border transition-all duration-200 rounded-sm font-sans font-bold text-sm
                        ${selectedSize === size 
                          ? "bg-white text-black border-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.5)] transform scale-105 z-10" 
                          : "border-white/20 text-muted-foreground hover:border-primary hover:text-primary bg-black/40"}
                      `}
                    >
                      {size}
                      {selectedSize === size && (
                        <motion.div 
                          layoutId="selected-size-indicator"
                          className="absolute inset-0 border-2 border-primary rounded-sm opacity-0"
                        />
                      )}
                    </button>
                  ))}
                    </div>
                     {!selectedSize && (
                        <p className="text-red-500 text-xs mt-2 opacity-0 animate-[pulse_2s_infinite]">Please select a size</p>
                    )}
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-2">
                    {isVault ? (
                       // Vault Action
                       <div className="space-y-4">
                            <Button 
                                size="lg" 
                                disabled={!selectedSize}
                                onClick={handleBuy}
                                className={`w-full h-14 text-lg uppercase tracking-widest font-bold transition-all duration-300
                                    ${selectedSize 
                                    ? "bg-primary text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(var(--primary),0.4)]" 
                                    : "bg-muted text-muted-foreground grayscale cursor-not-allowed"}
                                `}
                            >
                                <ShoppingCart className="mr-2 w-5 h-5" />
                                {selectedSize ? "Secure Pre-Order" : "Select Size"}
                            </Button>
                            
                            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest">
                                {product.slots ?? 0} of {product.totalSlots ?? 0} Slots Remaining
                            </p>
                       </div>
                    ) : (
                        // Shop Action
                        <div className="flex gap-4">
                            <Button 
                                size="lg" 
                                variant="outline"
                                className="flex-1 h-14 text-lg uppercase tracking-widest font-bold border-2 hover:bg-white hover:text-primary transition-all"
                                disabled={!selectedSize}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                            <Button 
                                size="lg" 
                                className={`flex-1 h-14 text-lg uppercase tracking-widest font-bold gap-2 transition-all
                                    ${selectedSize ? "shadow-[0_0_20px_rgba(var(--primary),0.4)]" : ""}
                                `}
                                disabled={!selectedSize || isBuying}
                                onClick={handleBuy}
                            >
                                {isBuying ? "Processing..." : `Buy Now`}
                            </Button>
                        </div>
                    )}
                    
                    {!isVault && (
                        <p className="text-center text-muted-foreground text-xs uppercase tracking-widest">
                            Free shipping on orders over ₱10,000
                        </p>
                    )}
               </div>

               {/* Trust Indicators */}
               {isVault ? (
                   <div className="pt-8">
                        <TrustTimeline currentStep={0} />
                   </div>
               ) : (
                    <div className="pt-8 border-t border-white/10 space-y-4">
                        <h3 className="text-xl font-display tracking-wide text-white">Product Highlights</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-md">
                                <Truck className="w-5 h-5 text-primary" />
                                <div className="text-xs">
                                    <span className="block font-bold uppercase text-white">Fast Delivery</span>
                                    <span className="text-muted-foreground">Within Metro Manila</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-md">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <div className="text-xs">
                                    <span className="block font-bold uppercase text-white">Authentic</span>
                                    <span className="text-muted-foreground">100% Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
               )}

               {/* Description */}
               {product.description && (
                   <div className="pt-8 border-t border-white/10 space-y-4">
                        <h3 className="text-xl font-display tracking-wide text-white">About The Pair</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {product.description}
                        </p>
                   </div>
               )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
