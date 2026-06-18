import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageShell } from '@/components/page-shell'
import { categories } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Categorias',
  description:
    'Explore todas as categorias da Encantart\u2019s: topos de bolo, kits festa, agendas, bottons, chaveiros, cadernos e muito mais.',
}

export default function CategoriasPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>{' '}
          / <span className="text-foreground">Categorias</span>
        </nav>
        <h1 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
          Todas as categorias
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Tudo o que você precisa para encantar momentos especiais, organizado por categoria.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categorias/${c.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="font-heading text-lg font-bold">{c.name}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {c.description}
                </p>
                {c.subcategories && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.subcategories.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
