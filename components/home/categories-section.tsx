import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/data'

export function CategoriesSection() {
  const featured = categories.slice(0, 6)
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
          Categorias em destaque
        </h2>
        <p className="mt-2 text-muted-foreground">
          Encontre tudo para encantar o seu momento especial
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {featured.map((c) => (
          <Link
            key={c.slug}
            href={`/categorias/${c.slug}`}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
          >
            <div className="relative size-20 overflow-hidden rounded-full bg-muted">
              <Image
                src={c.image || '/placeholder.svg'}
                alt={c.name}
                fill
                sizes="80px"
                className="object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <span className="font-heading text-sm font-bold leading-tight">{c.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/categorias"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Ver todas as categorias →
        </Link>
      </div>
    </section>
  )
}
