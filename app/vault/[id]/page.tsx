export const runtime = "edge";

import { SharedProductPage } from "@/components/shop/shared-product-page";

export default async function VaultProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SharedProductPage category="vault" id={id} />;
}
