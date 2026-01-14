"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Search, Heart, X, ArrowRight, Menu } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { useCart } from "@/lib/cart-context"
import { allProducts } from "@/lib/data"

export function Header() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Import allProducts needs to be at top, assuming it's imported as `import { allProducts } from "@/lib/data"` 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
        setSearchQuery("")
        if (searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100)
        }
    }
  }, [isSearchOpen])

  // Lock body scroll when search or mobile menu is open
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isSearchOpen, isMobileMenuOpen])

  const searchResults = searchQuery.trim() 
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : []

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "h-16 bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg" 
            : "h-16 bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg md:h-24 md:bg-transparent md:bg-gradient-to-b md:from-black/80 md:to-transparent md:backdrop-blur-[2px] md:border-none md:shadow-none"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Left Nav */}
          <div className="flex items-center">
            <button 
                className="md:hidden text-white hover:text-primary transition-colors mr-4"
                onClick={() => setIsMobileMenuOpen(true)}
            >
                <Menu className="w-6 h-6" />
            </button>

            <nav className="flex items-center gap-8 hidden md:flex">
                {[
                { href: "/shop", label: "Shop", exact: true },
                { href: "/shop/shoes", label: "Shoes", exact: false },
                { href: "/shop/apparel", label: "Apparel", exact: false },
                { href: "/vault", label: "Pre-Order", exact: false },
                ].map((link) => {
                const isActive = link.exact 
                    ? pathname === link.href 
                    : pathname.startsWith(link.href)
                
                return (
                    <Link 
                    key={link.href} 
                    href={link.href} 
                    className={`text-sm tracking-wider transition-colors font-bold uppercase relative group ${
                        isActive ? "text-primary" : "hover:text-primary text-white"
                    }`}
                    >
                    {link.label}
                    {isActive && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    )}
                    {!isActive && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    </Link>
                )
                })}
            </nav>
          </div>

          <Link
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 bg-transparent ${scrolled ? "w-28" : "w-28 md:w-48"}`}
          >
            <Image src="/dnd-mnl-logo-clean.png" alt="DND MNL" width={208} height={80} className="w-full h-auto drop-shadow-lg" priority />
          </Link>

          {/* Right Nav */}
          <div className="hidden md:flex items-center justify-center gap-6">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-primary transition-colors"
                aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart">
              <button className="hover:text-primary transition-colors relative flex items-center justify-center" aria-label="Cart">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] text-black font-bold animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/account">
              <button className="hover:text-primary transition-colors flex items-center justify-center" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-xl flex flex-col pt-32 px-6"
            >
                <div className="container mx-auto max-w-4xl relative">
                    <button 
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute -top-20 right-0 p-2 hover:text-primary transition-colors hover:rotate-90 duration-300"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="border-b-2 border-white/20 focus-within:border-primary transition-colors pb-4 flex items-center gap-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="WHAT ARE YOU LOOKING FOR?"
                            className="bg-transparent w-full text-3xl md:text-5xl font-display placeholder:text-muted-foreground/50 focus:outline-none uppercase tracking-wide text-white"
                        />
                    </div>

                    <div className="mt-12">
                        {searchQuery ? (
                           <>
                             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 block">
                                {searchResults.length > 0 ? "Search Results" : `No results for "${searchQuery}"`}
                             </span>
                             
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {searchResults.map(product => (
                                    <Link 
                                        key={product.id} 
                                        href={product.category === "vault" ? `/vault/${product.id}` : `/shop/${product.category}/${product.id}`}
                                        onClick={() => setIsSearchOpen(false)}
                                        className="group block"
                                    >
                                        <div className="aspect-square bg-secondary/20 mb-3 overflow-hidden relative">
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            />
                                            {product.category === "vault" && (
                                                <div className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                                                    Vault
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-sm uppercase tracking-wide text-white truncate group-hover:text-primary transition-colors">{product.name}</h4>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.brand}</p>
                                        <p className="text-sm font-display text-primary mt-1">₱{product.price.toLocaleString()}</p>
                                    </Link>
                                ))}
                             </div>
                           </>
                        ) : (
                            <>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 block">Trending Searches</span>
                                <div className="flex flex-wrap gap-4">
                                    {["Jordan 1 Travis Scott", "Yeezy Slide", "Dunk Low Panda", "Essentials Hoodie"].map((term) => (
                                        <button 
                                            key={term} 
                                            onClick={() => setSearchQuery(term)}
                                            className="px-6 py-3 border border-white/10 hover:border-primary hover:text-primary hover:bg-white/5 transition-all text-sm uppercase tracking-wider font-bold"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col p-6 md:hidden"
          >
             <div className="flex justify-between items-center mb-12">
                 <Image src="/dnd-mnl-logo-clean.png" alt="DND MNL" width={120} height={46} className="h-auto w-32" />
                 <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white hover:text-primary transition-colors"
                 >
                    <X className="w-8 h-8" />
                 </button>
             </div>

             <nav className="flex flex-col gap-6">
                {[
                  { href: "/", label: "Home", exact: true },
                  { href: "/shop", label: "Shop All", exact: true },
                  { href: "/shop/shoes", label: "Shoes", exact: false },
                  { href: "/shop/apparel", label: "Apparel", exact: false },
                  { href: "/vault", label: "Pre-Order Drops", exact: false },
                ].map((link) => {
                   const isActive = link.exact 
                    ? pathname === link.href 
                    : pathname.startsWith(link.href)
                   
                   return (
                     <Link 
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-2xl font-display uppercase tracking-wider transition-colors ${
                            isActive ? "text-primary" : "text-white hover:text-primary"
                        }`}
                     >
                        {link.label}
                     </Link>
                   )
                })}
             </nav>

             <div className="mt-auto border-t border-white/10 pt-8 space-y-6">
                 <div className="grid grid-cols-3 gap-4">
                    <button 
                        onClick={() => {
                            setIsMobileMenuOpen(false)
                            setIsSearchOpen(true)
                        }}
                        className="flex flex-col items-center justify-center gap-2 p-4 border border-white/10 rounded-lg hover:border-primary hover:text-primary transition-colors bg-white/5"
                    >
                        <Search className="w-6 h-6" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Search</span>
                    </button>

                    <Link 
                        href="/cart"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 border border-white/10 rounded-lg hover:border-primary hover:text-primary transition-colors bg-white/5 relative"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {totalItems > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                        <span className="text-[10px] uppercase tracking-widest font-bold">Cart</span>
                    </Link>

                    <Link 
                        href="/account"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 border border-white/10 rounded-lg hover:border-primary hover:text-primary transition-colors bg-white/5"
                    >
                        <User className="w-6 h-6" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Account</span>
                    </Link>
                 </div>

                 <p className="text-muted-foreground text-xs uppercase tracking-widest text-center">
                    DND MNL — Secure Your Step
                 </p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
