
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Product } from "@/lib/data"
import { toast } from "sonner"

export interface CartItem {
  id: string // composite key: productId-size
  product: Product
  size: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  
  // Selection for checkout
  selectedItemIds: string[]
  toggleSelection: (id: string) => void
  selectAll: () => void
  deselectAll: () => void
  selectedSubtotal: number
  selectedTotalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("dndmnl-cart")
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart)
        setItems(parsedItems)
        // Select all items by default on load
        setSelectedItemIds(parsedItems.map((i: CartItem) => i.id))
      } catch (e) {
        console.error("Failed to parse cart", e)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save to local storage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("dndmnl-cart", JSON.stringify(items))
    }
  }, [items, isInitialized])

  // Sync selection with items (remove IDs that no longer exist)
  useEffect(() => {
    setSelectedItemIds(prev => prev.filter(id => items.some(item => item.id === id)))
  }, [items])

  const addItem = (product: Product, size: string) => {
    setItems((prev) => {
      const itemId = `${product.id}-${size}`
      const existing = prev.find((item) => item.id === itemId)
      
      if (existing) {
        toast.success(`Updated quantity for ${product.name}`)
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      
      toast.success(`Added ${product.name} to cart`)
      // Auto-select new items
      setSelectedItemIds(prev => [...prev, itemId])
      return [...prev, { id: itemId, product, size, quantity: 1 }]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
    setSelectedItemIds(prev => prev.filter(id => id !== itemId))
    toast.info("Item removed from cart")
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
        removeItem(itemId)
        return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
    setSelectedItemIds([])
  }

  const toggleSelection = (id: string) => {
    setSelectedItemIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedItemIds(items.map(i => i.id))
  }

  const deselectAll = () => {
    setSelectedItemIds([])
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  // Derived selection stats
  const selectedItems = items.filter(item => selectedItemIds.includes(item.id))
  const selectedTotalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0)
  const selectedSubtotal = selectedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        selectedItemIds,
        toggleSelection,
        selectAll,
        deselectAll,
        selectedSubtotal,
        selectedTotalItems
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
