import { ProductGrid } from "@/components/ProductGrid";

import { useProducts } from "hooks/useProducts";

export function CatalogPage() {
  const { data: products } = useProducts();

  // TODO: melhorar loading state
  if(!products) return <div>Loading...</div>

  return (
    <div>
      <header>
        <h1>Catálogo Repforce</h1>
      </header>

      <main className="bg-[#50d71e]">
        {/* filter  */}
         <ProductGrid />
        {/*  paginacao */}
      </main>
    </div>
  )
}