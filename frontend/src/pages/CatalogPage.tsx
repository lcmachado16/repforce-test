import { ProductGrid } from "../components/ProductGrid";

import { useProducts } from "../hooks/useProducts";

export function CatalogPage() {
  const { data: products, isLoading} = useProducts();

  // TODO: melhorar loading state
  if(isLoading) return <div>Loading...</div>

  return (
    <div>
      <header>
        <h1>Catálogo Repforce</h1>
      </header>

      <main className="bg-[#50d71e]">
        {/* filter  */}
        <h1> Hello World</h1>
         <ProductGrid products={products ?? []} />
        {/*  paginacao */}
      </main>
    </div>
  )
}