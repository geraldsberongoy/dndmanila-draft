export const runtime = "edge";

import { SharedCategoryPage } from "@/components/shop/shared-category-page";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShoesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const brand =
    typeof searchParams.brand === "string" ? searchParams.brand : undefined;
  return <SharedCategoryPage category="shoes" brand={brand} />;
}
