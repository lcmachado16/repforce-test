// frontend/src/pages/ProductDetailPage.tsx
import { useState } from "react"
import { Link, useParams } from "@tanstack/react-router"
import { ArrowLeft, Package, ShieldCheck, Weight } from "lucide-react"
import { useProduct } from "../hooks/useProduct"
import { Button } from "../../@/components/ui/button"
import { Badge } from "../../@/components/ui/badge"

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(date))
}

export function ProductDetailPage() {
  const { id } = useParams({ strict: false })
  const { data: product, isLoading } = useProduct(id!)
  const [activeImage, setActiveImage] = useState(0)

  if (isLoading) return (
    <div style={{ display: "flex", minHeight: "60vh", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--color-text-secondary)" }}>Carregando produto...</p>
    </div>
  )

  if (!product) return (
    <div style={{ display: "flex", minHeight: "60vh", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <p style={{ fontSize: 18, fontWeight: 500 }}>Produto não encontrado</p>
      <Button asChild variant="outline"><Link to="/">Voltar ao catálogo</Link></Button>
    </div>
  )

  return (
    <div style={{ background: "var(--color-background-tertiary)", minHeight: "100vh", padding: "24px 16px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* voltar */}
        <button
          onClick={() => window.history.back()}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0 }}
        >
          <ArrowLeft size={15} /> Voltar ao catálogo
        </button>

        {/* badges */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <Badge variant="secondary">{product.category}</Badge>
          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
            {product.stock > 0 ? "Em estoque" : "Esgotado"}
          </Badge>
        </div>

        {/* grid principal */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* galeria */}
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: 16 }}>
            <div style={{ borderRadius: 8, overflow: "hidden", background: "var(--color-background-secondary)" }}>
              <img
                src={product.images[activeImage]}
                alt={product.title}
                style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }}
              />
            </div>

            {product.images.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 10 }}>
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                      border: activeImage === i ? "1.5px solid #378add" : "0.5px solid var(--color-border-tertiary)",
                      cursor: "pointer",
                      background: "var(--color-background-secondary)"
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: 64, objectFit: "cover", display: "block" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* informações */}
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>

            <div>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-secondary)", marginBottom: 4 }}>{product.brand}</p>
              <h1 style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.3, color: "var(--color-text-primary)", margin: 0 }}>{product.title}</h1>
              <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 4 }}>SKU: {product.sku}</p>
            </div>

            <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14 }}>
              <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 2 }}>Preço</p>
              <p style={{ fontSize: 28, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{formatBRL(product.price)}</p>
              <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>À vista no PIX</p>
            </div>

            {/* specs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[
                { icon: <Package size={13} />, label: "Estoque", value: `${product.stock} un.` },
                { icon: <Weight size={13} />, label: "Peso", value: `${product.weightKg} kg` },
                { icon: <ShieldCheck size={13} />, label: "Garantia", value: `${product.warrantyMonths} meses` },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 4 }}>
                    {icon} {label}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* descrição */}
            <div style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--color-text-primary)" }}>Sobre o produto</p>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: 0 }}>{product.description}</p>
            </div>

            {/* ações */}
            <div style={{ display: "flex", gap: 8, borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14 }}>
              <Button style={{ flex: 1 }}>Solicitar cotação</Button>
              <Button variant="outline">Falar com vendedor</Button>
            </div>

            <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>
              Cadastrado em {formatDate(product.createdAt)}
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}