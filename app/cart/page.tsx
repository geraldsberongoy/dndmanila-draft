"use client"

import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ArrowRight, CheckSquare, Square, Truck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function CartPage() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    selectedSubtotal, 
    selectedTotalItems,
    selectedItemIds,
    toggleSelection 
  } = useCart()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl font-display tracking-wider mb-12 uppercase">Your Cart ({items.length})</h1>

          {items.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-white/20">
               <h2 className="text-2xl font-bold uppercase tracking-widest text-muted-foreground mb-6">Your cart is empty</h2>
               <Link href="/shop">
                 <Button size="lg" className="bg-white text-black hover:bg-primary uppercase font-bold tracking-widest">
                    Start Shopping
                 </Button>
               </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
               {/* Cart Items List */}
               <div className="lg:col-span-2 space-y-6">
                 <AnimatePresence mode="popLayout">
                   {items.map((item) => {
                     const isSelected = selectedItemIds.includes(item.id)
                     return (
                       <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className={`flex gap-4 sm:gap-6 p-4 sm:p-6 border transition-colors items-center group
                            ${isSelected ? "border-primary/50 bg-secondary/10" : "border-white/10 bg-secondary/5"}
                          `}
                       >
                          {/* Selection Checkbox */}
                          <button
                            onClick={() => toggleSelection(item.id)}
                            className="flex-shrink-0 text-muted-foreground hover:text-white transition-colors"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-6 h-6 text-primary" />
                            ) : (
                              <Square className="w-6 h-6" />
                            )}
                          </button>

                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 flex-shrink-0 relative overflow-hidden">
                             <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                                <div>
                                   <h3 className="font-display text-xl uppercase tracking-wider truncate pr-4">{item.product.name}</h3>
                                   <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.product.brand} • Size {item.size}</p>
                                </div>
                                <p className="font-bold text-lg">₱{(item.product.price * item.quantity).toLocaleString()}</p>
                             </div>
                             
                             <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center border border-white/20 h-8">
                                   <button 
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                                   >
                                      <Minus className="w-3 h-3" />
                                   </button>
                                   <div className="w-10 h-full flex items-center justify-center text-sm font-bold border-x border-white/20">
                                      {item.quantity}
                                   </div>
                                   <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                                   >
                                      <Plus className="w-3 h-3" />
                                   </button>
                                </div>
                                
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-muted-foreground hover:text-red-500 transition-colors text-xs flex items-center gap-1 uppercase tracking-wider font-bold"
                                >
                                  <Trash2 className="w-3 h-3" /> Remove
                                </button>
                             </div>
                          </div>
                       </motion.div>
                     )
                   })}
                 </AnimatePresence>
               </div>

               {/* Summary */}
               <div className="h-fit space-y-6">
                  <div className="bg-secondary/10 border border-white/10 p-8 sticky top-32">
                      <h3 className="text-xl font-display uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                      
                      <div className="space-y-4 text-sm mb-8">
                          <div className="flex justify-between text-muted-foreground">
                              <span>Selected Subtotal ({selectedTotalItems} items)</span>
                              <span className="text-white">₱{selectedSubtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                              <span>Shipping</span>
                              <span className="text-green-400">Calculated at checkout</span>
                          </div>
                      </div>

                      <div className="flex justify-between text-xl font-bold font-display mb-8">
                          <span>Total</span>
                          <span className="text-primary">₱{selectedSubtotal.toLocaleString()}</span>
                      </div>

                      <Link href="/checkout" onClick={(e) => selectedTotalItems === 0 && e.preventDefault()}>
                        <Button 
                            disabled={selectedTotalItems === 0}
                            className={`w-full h-14 uppercase tracking-widest font-bold text-lg gap-2
                                ${selectedTotalItems > 0 
                                    ? "bg-primary text-black hover:bg-white" 
                                    : "bg-muted text-muted-foreground cursor-not-allowed"}
                            `}
                        >
                            Checkout ({selectedTotalItems}) <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                      
                      {selectedTotalItems === 0 && (
                          <p className="text-center text-xs text-red-400 mt-2 uppercase tracking-wide animate-pulse">
                              Please select items to checkout
                          </p>
                      )}
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 border border-white/10 bg-secondary/5">
                      <div className="p-2 bg-primary/20 rounded-full">
                          <Truck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                          <p className="font-bold text-sm uppercase tracking-wider mb-1">Free Shipping</p>
                          <p className="text-xs text-muted-foreground">Free standard shipping on all orders over ₱10,000.</p>
                      </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

