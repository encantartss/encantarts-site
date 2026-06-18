import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star, Clock, Truck, ShieldCheck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { ProductCustomizer } from '@/components/product-customizer'
import { ProductCard } from '@/components/product-card'
import { Badge } from '@/components/ui/badge'
import {
  products,
  getProduct,
  getProductsByCategory,
  formatPrice,
} from '@/lib/data'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Produto não encontrado' }
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  }
}

export default async function ProdutoPage({ params }: Params) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: "Encantart's Papelaria Criativa" },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>{' '}
          /{' '}
          <Link
            href={`/categorias/${product.category}`}
            className="hover:text-primary"
          >
            {product.categoryName}
          </Link>{' '}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Galeria */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badges?.includes('promocao') && (
                <Badge className="absolute left-4 top-4 bg-secondary text-secondary-foreground">
                  Promoção
                </Badge>
              )}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                >
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={`${product.name} - imagem ${i + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info + Customizer */}
          <div>
            <p className="text-sm font-medium text-primary">{product.categoryName}</p>
            <h1 className="mt-1 text-balance font-heading text-3xl font-bold sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < Math.round(product.rating)
                        ? 'fill-[var(--gold)] text-[var(--gold)]'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewsCount} avaliações)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="font-heading text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              {product.longDescription}
            </p>

            {/* Prazo e benefícios */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl bg-secondary/40 p-3 text-sm">
                <Clock className="size-5 shrink-0 text-secondary-foreground" />
                <span>
                  Produção em <strong>{product.productionDays} dias úteis</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-muted p-3 text-sm">
                <Truck className="size-5 shrink-0 text-primary" />
                <span>Envio para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-muted p-3 text-sm">
                <ShieldCheck className="size-5 shrink-0 text-primary" />
                <span>Aprovação de arte inclusa</span>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <ProductCustomizer product={product} />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-heading text-2xl font-bold">
              Você também vai amar
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  )
}
