import { useEffect, useState } from "react"

import { Card, CardContent } from "../@/components/ui/card"
import { Button } from "../@/components/ui/button"
import { Badge } from "../@/components/ui/badge"
import { Skeleton } from "../@/components/ui/skeleton"

type Product = {
  id: string
  title: string
  category: string
  thumbnail: string
  images: string[]
  price: number
  stock: number
  sku: string
  brand: string
  weightKg: number
  warrantyMonths: number
  createdAt: string
  description: string
}

const fakeProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
  id: `prod-${index + 1}`,
  title: `Notebook Empresarial X${index + 1}`,
  category: "Eletrônicos",
  thumbnail: `https://picsum.photos/seed/prod-${index}/400/300`,
  images: [
    `https://picsum.photos/seed/prod-${index}-1/800/600`,
    `https://picsum.photos/seed/prod-${index}-2/800/600`,
  ],
  price: 4599.9 + index * 100,
  stock: index % 3 === 0 ? 0 : 23,
  sku: `NB-X14-00${index}`,
  brand: "TechCorp",
  weightKg: 1.8,
  warrantyMonths: 12,
  createdAt: "2025-08-12",
  description:
    "Texto longo do produto, com features, especificações...",
}))

const ITEMS_PER_PAGE = 12

export default function App() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(fakeProducts)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const paginatedProducts = products.slice(startIndex, endIndex)

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">
          Catálogo de Produtos
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="space-y-4 p-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-lg font-medium">
              Nenhum produto encontrado
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden transition hover:shadow-xl"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-52 w-full object-cover"
                  />

                  <CardContent className="space-y-4 p-4">
                    <div>
                      <p className="text-sm text-zinc-500">
                        {product.category}
                      </p>

                      <h2 className="line-clamp-2 text-lg font-semibold">
                        {product.title}
                      </h2>

                      <p className="text-sm text-zinc-600">
                        Marca: {product.brand}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-green-600">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(product.price)}
                      </p>

                      <Badge
                        variant={
                          product.stock > 0
                            ? "default"
                            : "destructive"
                        }
                      >
                        {product.stock > 0
                          ? "Em estoque"
                          : "Esgotado"}
                      </Badge>
                    </div>

                    <Button className="w-full">
                      Ver detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Anterior
              </Button>

              <span className="font-medium">
                Página {page} de {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Próxima
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}