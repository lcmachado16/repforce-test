import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { type Product } from '@repforce/shared'

/* --- Products --- */
async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}
/* --- Product by id --- */
async function fetchProduct(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id),
  })
}