import { Card } from "../../@/components/ui/card";
import { type Product } from '@repforce/shared' // vem do shared

export function ProductCard({ product }: { product: Product }) {

    return (
        // https://tailwindcss.com/docs/background-color
        <Card className="bg-indigo-500 hover:bg-fuchsia-500 ">
            {product.title }
            {product.price && (
                <p className="text-white font-bold">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
            )}
            {product.stock > 0 ? (
                <span className="text-green-500 font-semibold">Em estoque</span>
            ) : (
                <span className="text-red-500 font-semibold">Esgotado</span>
            )}
            {product.thumbnail && (
                <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            )} 

        </Card>

        /* 
    Cada card mostra: thumbnail, título, categoria, marca, preço formatado em BRL (R$
            4.599,90), badge de estoque (Em estoque / Esgotado).
        */

    )
}