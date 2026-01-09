"use client"

import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { Package, Clock, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface OrderItem {
  id: string
  product: any
  size: string
  quantity: number
}

interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: string
}

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<"preorders" | "history">("preorders")

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("dndmnl-orders") || "[]")
    setOrders(savedOrders)
  }, [])

  // Filter orders containing vault items
  const preOrders = orders.filter(
    order => order.items.some(item => item.product.category === "vault") && order.status !== "Delivered"
  )

  // Other orders
  const regularOrders = orders.filter(
    order => !order.items.some(item => item.product.category === "vault") || order.status === "Delivered"
  )

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-6">
              <div>
                 <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-white mb-2">My Account</h1>
                 <p className="text-muted-foreground">Manage your orders and pre-orders.</p>
              </div>
              
              <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveTab("preorders")}
                    className={`pb-2 text-sm font-bold uppercase tracking-widest border-b-2 transition-all hover:text-primary ${activeTab === "preorders" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                  >
                    Vault Pre-Orders ({preOrders.length})
                  </button>
                  <button 
                    onClick={() => setActiveTab("history")}
                    className={`pb-2 text-sm font-bold uppercase tracking-widest border-b-2 transition-all hover:text-primary ${activeTab === "history" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                  >
                    Order History ({regularOrders.length})
                  </button>
              </div>
           </div>

           {activeTab === "preorders" && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {preOrders.length === 0 ? (
                    <div className="text-center py-24 bg-secondary/5 border border-dashed border-white/10 rounded-lg">
                        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">No Active Pre-Orders</h3>
                        <p className="text-muted-foreground mb-6">You don't have any pending Vault drops.</p>
                        <Link href="/vault">
                            <Button variant="outline" className="uppercase tracking-widest font-bold">Explore Vault</Button>
                        </Link>
                    </div>
                ) : (
                    preOrders.map(order => (
                        <OrderCard key={order.id} order={order} type="preorder" />
                    ))
                )}
             </div>
           )}

           {activeTab === "history" && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {regularOrders.length === 0 ? (
                    <div className="text-center py-24 bg-secondary/5 border border-dashed border-white/10 rounded-lg">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">No Order History</h3>
                        <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                        <Link href="/shop">
                            <Button className="bg-primary text-black uppercase tracking-widest font-bold">Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    regularOrders.map(order => (
                        <OrderCard key={order.id} order={order} type="regular" />
                    ))
                )}
             </div>
           )}
        </div>
      </main>
    </div>
  )
}

function OrderCard({ order, type }: { order: Order, type: "preorder" | "regular" }) {
    return (
        <div className="border border-white/10 bg-secondary/5 overflow-hidden group hover:border-white/20 transition-colors">
            <div className="bg-white/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
                <div className="flex gap-8 text-sm">
                    <div>
                        <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Order ID</span>
                        <span className="font-bold font-mono text-white">{order.id}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Date Placed</span>
                        <span className="text-white">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total</span>
                        <span className="font-bold text-primary">₱{order.total.toLocaleString()}</span>
                    </div>
                </div>
                <div>
                    <span className={`
                        px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
                        ${type === "preorder" 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "bg-green-500/10 text-green-500 border-green-500/20"}
                    `}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="p-6">
                {order.items.map((item, idx) => (
                    <div key={`${order.id}-${idx}`} className="flex gap-4 mb-4 last:mb-0">
                        <div className="w-20 h-20 bg-black/20 relative flex-shrink-0">
                             <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg uppercase tracking-wider">{item.product.name}</h4>
                             <div className="flex gap-4 text-xs text-muted-foreground uppercase tracking-widest mt-1">
                                <span>Size: {item.size}</span>
                                <span>Qty: {item.quantity}</span>
                                {item.product.category === "vault" && (
                                    <span className="text-primary font-bold">Vault Exclusive</span>
                                )}
                             </div>
                             {item.product.category === "vault" && (
                                 <div className="mt-2 inline-flex items-center gap-2 text-[10px] text-primary uppercase tracking-wider bg-primary/5 px-2 py-1">
                                     <Package className="w-3 h-3" /> Estimate Drop: {item.product.dropDate || "TBA"}
                                 </div>
                             )}
                        </div>
                        <div className="text-right">
                             <span className="font-display text-lg">₱{item.product.price.toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
