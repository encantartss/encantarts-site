import { MousePointerClick, Palette, CheckCircle2, Truck } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Escolha e personalize',
    text: 'Selecione o produto e preencha nome, tema, data e envie suas fotos e referências.',
  },
  {
    icon: Palette,
    title: 'Criamos sua arte',
    text: 'Nossa equipe desenvolve uma prévia exclusiva com todo o cuidado nos detalhes.',
  },
  {
    icon: CheckCircle2,
    title: 'Você aprova',
    text: 'Receba a prévia na sua área do cliente e aprove ou peça ajustes antes da produção.',
  },
  {
    icon: Truck,
    title: 'Produção e entrega',
    text: 'Produzimos com capricho e enviamos para todo o Brasil com rastreio.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
      <div className="mb-10 text-center">
        <h2 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
          Como funciona
        </h2>
        <p className="mt-2 text-muted-foreground">
          Do pedido à entrega, em 4 passos encantadores
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="relative flex flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <s.icon className="size-7" />
            </div>
            <span className="mt-4 flex size-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <h3 className="mt-3 font-heading text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
