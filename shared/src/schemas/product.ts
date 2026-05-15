import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  stock: z.number().int(),
  sku: z.string(),
  brand: z.string(),
  weightKg: z.number(),
  warrantyMonths: z.number().int(),
  createdAt: z.string(),
  description: z.string(),
})

export type Product = z.infer<typeof productSchema>
