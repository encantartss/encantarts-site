import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const items = [
  'Topo de bolo',
  'Forminhas',
  'Toppers',
  'Porta Bis',
  'Tags',
  'Bottons',
  'Chaveiros',
]

export function KitFestaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
      <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border bg-accent/30 lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
          <Image
            src="/images/cat-kit-festa.png"
            alt="Kit festa completo personalizado"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="p-8 lg:p-12">
          <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
            Monte do seu jeito
          </span>
          <h2 className="mt-4 text-balance font-heading text-3xl font-bold sm:text-4xl">
            Kit Festa configurável
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Escolha cada item do seu kit e acompanhe o preço atualizado em tempo real.
            Adicione acabamentos especiais como papel lamicote, glitter e chatons.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {items.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-primary" />
                {i}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-7 rounded-full">
            <Link href="/kit-festa">Montar meu kit agora</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
