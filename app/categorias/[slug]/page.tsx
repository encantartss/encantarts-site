import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/page-shell'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
  categories,
  getCategory,
  getProductsByCategory,
} from '@/lib/data'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return { title: 'Categoria não encontrada' }
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categorias/${category.slug}` },
  }
}

export default async function CategoriaPage({ params }: Params) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const products = getProductsByCategory(slug)

  return (
    <PageShell>
      <div className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Início
            </Link>{' '}
            /{' '}
            <Link href="/categorias" className="hover:text-primary">
              Categorias
            </Link>{' '}
            / <span className="text-foreground">{category.name}</span>
          </nav>
          <h1 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{category.description}</p>
          {category.subcategories && (
            <div className="mt-4 flex flex-wrap gap-2">
              {category.subcategories.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-heading text-lg font-bold">
              Produtos chegando em breve!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Estamos preparando novidades encantadoras para esta categoria. Que tal fazer um
              orçamento personalizado?
            </p>
            <Button asChild className="mt-5 rounded-full">
              <Link href="/orcamento">Fazer orçamento</Link>
            </Button>
          </div>
        )}
      </div>
    </PageShell>
  )
}
