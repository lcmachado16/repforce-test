// frontend/src/routeTree.tsx
import { createRootRoute, createRoute } from '@tanstack/react-router'
import { CatalogPage } from './pages/CatalogPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

const rootRoute = createRootRoute()

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CatalogPage,
})

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  component: ProductDetailPage,
})

export const routeTree = rootRoute.addChildren([
  catalogRoute,
  productDetailRoute,
])