import { Router } from 'express'
// import { z } from 'zod'
import { products } from '../data/products'

export const productsRouter = Router()

productsRouter.get('/products', (req, res) => {
    const productsRes = products
    res.json(products)
})