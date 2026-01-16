"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useMemo, Suspense } from "react"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { items, selectedItemIds, removeItem } = useCart()

  // Direct Checkout params (Buy Now)
  const productId = searchParams.get("product")
  const size = searchParams.get("size")
  const category = searchParams.get("category")
  
  const directProduct = useMemo(() => 
    allProducts.find(p => p.id === productId && (!category || p.category === category)
  ), [productId, category])

  // Determine items to checkout
  const checkoutItems = useMemo(() => {
    if (productId && size && directProduct) {
        return [{
            id: "direct-checkout",
            product: directProduct,
            size: size,
            quantity: 1
        }]
    }
    // Otherwise use selected cart items
    return items.filter(item => selectedItemIds.includes(item.id))
  }, [productId, size, directProduct, items, selectedItemIds])

  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  const totalItems = checkoutItems.reduce((acc, item) => acc + item.quantity, 0)
  
  const [step, setStep] = useState<"review" | "success">("review")

  useEffect(() => {
    // If no items to checkout, redirect
    if (checkoutItems.length === 0 && step === "review") {
        const timeout = setTimeout(() => {
             // router.push("/cart") // Commented out to prevent flash redirects during dev logic testing
        }, 500)
        return () => clearTimeout(timeout)
    }
  }, [checkoutItems, step, router])

  const handlePlaceOrder = () => {
     // Simulate API call
     const newOrder = {
         id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
         date: new Date().toISOString(),
         items: checkoutItems,
         total: subtotal,
         status: checkoutItems.some(i => i.product.category === "vault") ? "Pre-Order Confirmed" : "Processing"
     }

     const existingOrders = JSON.parse(localStorage.getItem("dndmnl-orders") || "[]")
     localStorage.setItem("dndmnl-orders", JSON.stringify([newOrder, ...existingOrders]))

     setStep("success")
     
     // Cleanup cart
     if (!productId) {
         checkoutItems.forEach(item => removeItem(item.id))
     }
  }

  if (checkoutItems.length === 0 && step === "review" && !productId) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center">
            <p className="text-white mb-4">No items selected for checkout.</p>
            <Link href="/cart">
                <Button>Return to Cart</Button>
            </Link>
        </div>
      )
  }

  if (step === "success") {
      return (
        <div className="min-h-screen bg-black flex flex-col">
             <Header />
             <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500 pt-24 md:pt-0">
                 <div className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_30px_rgba(var(--primary),0.4)] md:shadow-[0_0_50px_rgba(var(--primary),0.5)]">
                    <CheckCircle2 className="w-10 h-10 md:w-14 md:h-14 text-black" />
                 </div>
                 <h1 className="text-3xl md:text-6xl lg:text-7xl font-display uppercase tracking-widest mb-4 leading-tight">Order Confirmed</h1>
                 <p className="text-muted-foreground text-base md:text-lg max-w-md mb-8 md:mb-12">
                    Your order has been placed successfully.
                    <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-primary mt-3 block">
                        Saved to your Account History
                    </span>
                 </p>
                 <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto max-w-sm md:max-w-none">
                     <Link href="/account" className="w-full md:w-auto">
                        <Button variant="outline" className="w-full h-12 md:h-14 border-white/20 text-white hover:bg-white hover:text-black uppercase tracking-widest font-bold text-sm md:text-base">
                            View Account
                        </Button>
                     </Link>
                     <Link href="/shop" className="w-full md:w-auto">
                        <Button className="w-full h-12 md:h-14 bg-primary text-black hover:bg-white uppercase tracking-widest font-bold text-sm md:text-base">
                            Continue Shopping
                        </Button>
                     </Link>
                 </div>
             </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 md:pt-32 md:pb-24 px-4 md:px-6"> 
        <div className="container mx-auto max-w-6xl">
           <h1 className="text-2xl md:text-4xl font-display leading-normal tracking-widest mb-10 md:mb-12 uppercase border-b border-white/10 pb-6">Checkout ({totalItems} items)</h1>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 w-full">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                  <div className="space-y-3 md:space-y-4">
                      <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-primary mb-2 md:mb-4">Shipping Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          <input type="text" placeholder="First Name" className="bg-secondary/20 border border-white/10 p-3 md:p-4 text-base md:text-sm focus:border-primary focus:outline-none transition-colors rounded-none" />
                          <input type="text" placeholder="Last Name" className="bg-secondary/20 border border-white/10 p-3 md:p-4 text-base md:text-sm focus:border-primary focus:outline-none transition-colors rounded-none" />
                      </div>
                      <input type="email" placeholder="Email Address" className="w-full bg-secondary/20 border border-white/10 p-3 md:p-4 text-base md:text-sm focus:border-primary focus:outline-none transition-colors rounded-none" />
                      <input type="text" placeholder="Address" className="w-full bg-secondary/20 border border-white/10 p-3 md:p-4 text-base md:text-sm focus:border-primary focus:outline-none transition-colors rounded-none" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          <input type="text" placeholder="City" className="bg-secondary/20 border border-white/10 p-3 md:p-4 text-base md:text-sm focus:border-primary focus:outline-none transition-colors rounded-none" />
                          <input type="text" placeholder="Postal Code" className="bg-secondary/20 border border-white/10 p-3 md:p-4 text-base md:text-sm focus:border-primary focus:outline-none transition-colors rounded-none" />
                      </div>
                  </div>

                  <div className="space-y-3 md:space-y-4 pt-4 md:pt-8">
                      <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-primary mb-2 md:mb-4">Payment Method</h3>
                      <div className="p-3 md:p-6 border border-white/10 bg-secondary/10 flex flex-col sm:flex-row items-center justify-between cursor-pointer hover:border-primary transition-colors gap-3 md:gap-4">
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                              <div className="w-4 h-4 rounded-full border border-primary bg-primary flex-shrink-0" />
                              <span className="font-bold uppercase tracking-wider text-sm">Credit Card / Debit Card</span>
                          </div>
                      </div>
                      <div className="p-3 md:p-6 border border-white/10 bg-secondary/10 flex flex-col sm:flex-row items-center justify-between cursor-pointer hover:border-primary transition-colors opacity-50 gap-3 md:gap-4">
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                              <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
                              <span className="font-bold uppercase tracking-wider text-sm">GCash (Coming Soon)</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Order Summary */}
              <div className="bg-secondary/5 border border-white/10 p-5 md:p-8 h-fit sticky top-24 md:top-32 mt-6 md:mt-0">
                  <h3 className="text-lg md:text-xl font-display uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                  
                  <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {checkoutItems.map((item) => (
                        <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 relative flex-shrink-0">
                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                {item.quantity > 1 && (
                                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-black rounded-full flex items-center justify-center text-[10px] font-bold">
                                        {item.quantity}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <p className="font-bold uppercase tracking-wider text-sm mb-1 truncate">{item.product.name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                                    <span>{item.product.brand}</span>
                                    <span className="w-0.5 h-0.5 bg-white/20 rounded-full" />
                                    <span className="text-primary">Size: {item.size}</span>
                                </div>
                            </div>
                            <div className="ml-2 text-right flex flex-col justify-center">
                                <p className="font-display text-base md:text-lg">₱{(item.product.price * item.quantity).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-8 text-sm pt-4 border-t border-white/10">
                      <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>₱{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                          <span>Shipping</span>
                          <span>Free</span>
                      </div>
                      <div className="flex justify-between text-white font-bold pt-4 border-t border-white/10 text-xl md:text-2xl font-display tracking-wide">
                          <span>Total</span>
                          <span className="text-primary">₱{subtotal.toLocaleString()}</span>
                      </div>
                  </div>

                  <Button onClick={handlePlaceOrder} className="w-full h-12 md:h-14 bg-primary text-black hover:bg-white uppercase tracking-widest font-bold text-base md:text-lg">
                      Place Order
                  </Button>
                  <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-wider">
                      Secure Checkout powered by PayMongo
                  </p>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-white font-display text-xl animate-pulse">Loading Checkout...</p>
        </div>
    }>
        <CheckoutContent />
    </Suspense>
  )
}
