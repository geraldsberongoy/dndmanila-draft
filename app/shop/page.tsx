import { Header } from "@/components/header"
import { ProductCard } from "@/components/unified-product-card"
import { allProducts } from "@/lib/data"

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <Header />

        <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          
          {/* Vault / Pre-Order Section */}
          <div className="mb-24">
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl md:text-5xl font-display tracking-wider text-primary mb-2">Vault Drops</h2>
                    <p className="text-muted-foreground">Exclusive pre-order releases.</p>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProducts.filter(p => p.category === "vault").map((product) => (
                <ProductCard
                    key={`vault-${product.id}`}
                    product={{
                        ...product,
                        id: product.id,
                        category: "Pre-Order",
                        href: `/vault/${product.id}`
                    }}
                />
                ))}
            </div>
          </div>

          {/* Regular Shop Section */}
          <div>
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                <div>
                     <h2 className="text-4xl md:text-5xl font-display tracking-wider mb-2">In Stock</h2>
                     <p className="text-muted-foreground">Ready to ship immediately.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProducts.filter(p => p.category !== "vault").map((product) => (
                <ProductCard
                    key={`${product.category}-${product.id}`}
                    product={{
                        ...product,
                        id: product.id,
                        category: product.brand,
                        href: `/shop/${product.category}/${product.id}`
                    }}
                />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
