import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { type Product, formatPrice } from '@/lib/data'

const badgeLabels: Record<string, string> = {
  'mais-vendido': 'Mais vendido',
  lancamento: 'Lançamento',
  promocao: 'Promoção',
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.badges.map((b) => (
              <Badge
                key={b}
                className={
                  b === 'promocao'
                    ? 'bg-secondary text-secondary-foreground'
                    : b === 'lancamento'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-primary text-primary-foreground'
                }
              >
                {badgeLabels[b]}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-muted-foreground">{product.categoryName}</p>
        <h3 className="mt-1 line-clamp-2 font-heading text-sm font-bold leading-snug">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <Star className="size-3.5 fill-[var(--gold)] text-[var(--gold)]" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
        </div>
        <div className="mt-auto pt-3">
          {product.oldPrice && (
            <span className="mr-2 text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="font-heading text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  )
}
