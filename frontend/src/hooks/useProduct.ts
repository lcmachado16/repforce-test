import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { type Product } from '@repforce/shared'

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