

/**
 * TODO: implementar página de detalhes do produto, acessível ao clicar em um card na página de catálogo.
 * Entra: produto selecionado ou id do produto
 * Sai: detalhes do produto (thumbnail, título, categoria, marca, preço formatado em BRL (R$ 4.599,90), badge de estoque (Em estoque / Esgotado)). 
 * */ 
// frontend/src/pages/ProductDetailPage.tsx
import { useParams} from '@tanstack/react-router'
import { useProduct } from '../hooks/useProduct'


export function ProductDetailPage() {
  const { id } = useParams({ strict: false })
  const { data: product, isLoading } = useProduct(id!)

  if (isLoading) return <div>Carregando...</div>
  if (!product) return <div>Produto não encontrado</div>

  return (
    <div>
        <h1>{product.title}</h1>
        <p>Categoria: {product.category}</p>
    </div>
  )
}