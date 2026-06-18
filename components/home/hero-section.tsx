import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Gift, MessageCircleHeart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-20">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
            <Sparkles className="size-4" />8 anos encantando momentos
          </span>
          <h1 className="mt-5 text-pretty font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            A fantástica arte de{' '}
            <span className="text-primary">encantar</span>
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Criando momentos especiais através da papelaria personalizada. Topos de bolo,
            kits festa, agendas e brindes feitos com carinho para você.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/categorias/topos-de-bolo">Comprar agora</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/orcamento">
                <Gift className="size-5" />
                Fazer orçamento
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/atendimento">
                <MessageCircleHeart className="size-5" />
                Atendimento
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">+12 mil</p>
              <p>festas encantadas</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">4.9/5</p>
              <p>avaliação dos clientes</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">Brasil</p>
              <p>entrega nacional</p>
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <Image
              src="/images/hero-banner.png"
              alt="Papelaria personalizada e decoração de festa da Encantart's"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-border bg-card p-3 shadow-lg sm:flex sm:items-center sm:gap-3">
            <Image
              src="/images/encantinha-mascote.png"
              alt="Encantinha"
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
            <div className="pr-2">
              <p className="font-heading text-sm font-bold">Oi, sou a Encantinha!</p>
              <p className="text-xs text-muted-foreground">Posso te ajudar a criar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
