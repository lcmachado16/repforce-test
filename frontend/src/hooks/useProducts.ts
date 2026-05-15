import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { type Product } from '@repforce/shared'

/* --- Products --- */
// async function fetchProducts(): Promise<Product[]> {
//   const { data } = await api.get<Product[]>('/products')
//   return data
// }

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products')
      console.log('produtos recebidos:', data) // <-- add isso
      return data
    },
  })
}