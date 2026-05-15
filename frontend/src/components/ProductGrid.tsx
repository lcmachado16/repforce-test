import { ProductCard } from "./ProductCard";
import { type Product } from '@repforce/shared' // vem do shared


export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <div>Nenhum produto encontrado</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}