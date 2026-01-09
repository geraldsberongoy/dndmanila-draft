import { Header } from "@/components/header"
import { TrustTimeline } from "@/components/trust-timeline"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-6 mb-16">
            <div className="flex justify-center">
              <CheckCircle2 className="w-20 h-20 text-primary" />
            </div>

            <h1 className="text-6xl font-display tracking-wider">{"You're On The List."}</h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {"Your pair has been reserved under your name. We'll notify you as your order progresses."}
            </p>
          </div>

          {/* Order Status Card */}
          <div className="bg-card border border-border rounded-sm p-8 space-y-8">
            <div className="flex items-center gap-6">
              <img src="/air-jordan-1-sneaker.jpg" alt="Your reserved pair" className="w-24 h-24 rounded-sm" />
              <div className="flex-1">
                <h2 className="text-2xl font-display tracking-wide mb-2">
                  Air Jordan 1 Retro High OG
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Size: US 10</span>
                  <span>•</span>
                  <span>Order #MNL-2026-001</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <TrustTimeline currentStep={0} />
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-mono">Feb 20 - Mar 1, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Status</span>
                <span className="text-primary font-mono">50% PAID</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/vault">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
                Browse More Drops
              </Button>
            </Link>
            <Link href="/orders">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View All Orders</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
