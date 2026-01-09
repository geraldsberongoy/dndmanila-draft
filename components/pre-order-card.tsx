import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface PreOrderCardProps {
  id: string
  name: string
  image: string
  dropDate: string
  slotsRemaining: number
  totalSlots: number
  price: number
}

export function PreOrderCard({ id, name, image, dropDate, slotsRemaining, totalSlots, price }: PreOrderCardProps) {
  const isLowStock = slotsRemaining < 10
  const isSoldOut = slotsRemaining === 0

  return (
    <div className="bg-card rounded-sm overflow-hidden border border-border hover:border-primary/50 transition-all group">
      {/* Image */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isLowStock && !isSoldOut && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-destructive text-destructive-foreground text-xs font-mono rounded-sm">
            LOW STOCK
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-2xl font-display tracking-wider">SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-display tracking-wide text-balance">{name}</h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{dropDate}</span>
        </div>

        {/* Slots Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Slots</span>
            <span className={isLowStock ? "text-destructive font-mono" : "font-mono"}>
              {slotsRemaining} / {totalSlots}
            </span>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${isLowStock ? "bg-destructive" : "bg-primary"}`}
              style={{ width: `${(slotsRemaining / totalSlots) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-display tracking-wide">₱{price.toLocaleString()}</span>
          <Link href={`/vault/${id}`}>
            <Button disabled={isSoldOut} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {isSoldOut ? "Sold Out" : "Reserve Slot"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
