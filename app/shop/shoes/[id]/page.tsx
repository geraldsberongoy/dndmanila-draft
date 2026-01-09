
import { SharedProductPage } from "@/components/shop/shared-product-page"

export default async function ShoesProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SharedProductPage category="shoes" id={id} />
}
