import { Router } from 'express'
import { z } from 'zod'
import { products } from '../data/products'

export const productsRouter = Router()

productsRouter.get('/products', (req, res) => {
    res.json(products)
})

productsRouter.get('/products/:id', (req, res) => {
    const { id } = z.object({ id: z.string() }).parse(req.params)

    const product = products.find(p => p.id === id)

    if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' })
    }

    res.json(product);
})