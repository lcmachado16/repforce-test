import { ProductGrid } from "@/components/ProductGrid";

// pages/CatalogPage.tsx
export function CatalogPage() {


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