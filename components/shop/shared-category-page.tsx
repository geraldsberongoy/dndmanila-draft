
import { Header } from "@/components/header"
import { ProductCard } from "@/components/unified-product-card"
import { allProducts } from "@/lib/data"

interface SharedCategoryPageProps {
  category: "shoes" | "apparel"
}

export function SharedCategoryPage({ category }: SharedCategoryPageProps) {
  const products = allProducts.filter((p) => p.category === category)
  const title = category === "shoes" ? "Shoes Collection" : "Apparel Collection"
  const description = category === "shoes" 
      ? "Step into style. Ready to ship." 
      : "Urban essentials. Street-ready style."

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h1 className="text-6xl font-display tracking-wider mb-4 capitalize">{title}</h1>
            <p className="text-muted-foreground text-lg">{description}</p>
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
        </div>
      </main>
    </div>
  )
}
