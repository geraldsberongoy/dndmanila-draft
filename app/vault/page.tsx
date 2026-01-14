import { Header } from "@/components/header"
import { PreOrderCard } from "@/components/pre-order-card"
import { vaultProducts } from "@/lib/data"

export default function VaultPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-display tracking-wider">Incoming Drops</h1>
            <p className="text-muted-foreground text-lg">Limited slots. No restocks.</p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vaultProducts.map((product) => (
              <PreOrderCard 
                key={product.id} 
                {...product} 
                dropDate={product.dropDate || "TBA"}
                slotsRemaining={product.slots || 0}
                totalSlots={product.totalSlots || 0}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
