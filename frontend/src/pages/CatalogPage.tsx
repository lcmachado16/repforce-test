import { ProductGrid } from "@/components/ProductGrid";

// pages/CatalogPage.tsx
export function CatalogPage() {


  return (
    <div>
      <header>
        <h1>Catálogo Repforce</h1>
      </header>

      <main>
        {/* filter  */}
         <ProductGrid />
        {/*  paginacao */}
      </main>
    </div>
  )
}