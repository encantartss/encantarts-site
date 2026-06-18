import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { type Product } from '@/lib/data'

export function ProductCarousel({
  title,
  subtitle,
  products,
  ctaHref,
  className,
}: {
  title: string
  subtitle?: string
  products: Product[]
  ctaHref?: string
  className?: string
}) {
  if (products.length === 0) return null
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </div>
          {ctaHref && (
            <Button asChild variant="outline" className="rounded-full">
              <Link href={ctaHref}>Ver tudo</Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
