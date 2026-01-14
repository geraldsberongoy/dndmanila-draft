import Link from "next/link"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/unified-product-card"
import { allProducts, FOOTWEAR_BRANDS, APPAREL_BRANDS } from "@/lib/data"

interface SharedCategoryPageProps {
  category: "shoes" | "apparel"
  brand?: string
}

export function SharedCategoryPage({ category, brand }: SharedCategoryPageProps) {
  const products = allProducts.filter((p) => {
    const matchCategory = p.category === category
    const matchBrand = brand ? p.brand.toLowerCase() === brand.toLowerCase() : true
    return matchCategory && matchBrand
  })
  
  const titleData = category === "shoes" ? "Shoes Collection" : "Apparel Collection"
  const title = brand ? `${brand} ${titleData}` : titleData
  const description = category === "shoes" 
      ? "Step into style. Ready to ship." 
      : "Urban essentials. Street-ready style."

  const brands = category === "shoes" ? FOOTWEAR_BRANDS : APPAREL_BRANDS

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display tracking-wider mb-4 capitalize">{title}</h1>
            <p className="text-muted-foreground text-lg mb-8">{description}</p>

            {/* Brand Filter Bar */}
            <div className="flex flex-wrap gap-2 md:gap-4 pb-4 border-b border-white/10">
               <Link 
                  href={`/shop/${category}`} 
                  className={cn(
                    "px-4 py-2 text-sm font-bold uppercase tracking-widest border transition-all rounded-sm",
                    !brand 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-muted-foreground border-white/10 hover:border-white hover:text-white"
                  )}
               >
                  All
               </Link>
               {brands.map((b) => {
                  const isActive = brand?.toLowerCase() === b.name.toLowerCase()
                  return (
                    <Link
                      key={b.id}
                      href={`/shop/${category}?brand=${b.name.toLowerCase()}`}
                      className={cn(
                        "px-4 py-2 text-sm font-bold uppercase tracking-widest border transition-all rounded-sm",
                        isActive 
                          ? "bg-white text-black border-white" 
                          : "bg-transparent text-muted-foreground border-white/10 hover:border-white hover:text-white"
                      )}
                    >
                      {b.name}
                    </Link>
                  )
               })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                   ...product,
                   id: product.id,
                   category: product.brand,
                   href: `/shop/${category}/${product.id}`
                }}
              />
            ))}
          </div>
          
          {products.length === 0 && (
             <div className="py-20 text-center text-muted-foreground">
                <p className="text-xl">No products found for this filter.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  )
}
