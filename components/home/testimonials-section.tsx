import { Star } from 'lucide-react'
import { reviews } from '@/lib/data'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? 'fill-[var(--gold)] text-[var(--gold)]'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="mb-8 text-center">
          <h2 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
            Avaliações reais de quem se encantou
          </h2>
          <p className="mt-2 text-muted-foreground">
            Mais de 12 mil festas e momentos especiais criados com amor
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-5"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                {r.text}
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-3">
                <p className="font-heading text-sm font-bold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
