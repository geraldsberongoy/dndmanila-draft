export const runtime = "edge";

import { SharedProductPage } from "@/components/shop/shared-product-page";

export default async function ApparelProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SharedProductPage category="apparel" id={id} />;
}
