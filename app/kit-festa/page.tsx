import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/page-shell'
import { KitBuilder } from '@/components/kit-builder'

export const metadata: Metadata = {
  title: 'Montar Kit Festa',
  description:
    'Monte seu kit festa personalizado escolhendo cada item e acompanhe o preço em tempo real. Topo de bolo, forminhas, toppers, tags e muito mais.',
  alternates: { canonical: '/kit-festa' },
}

export default function KitFestaPage() {
  return (
    <PageShell>
      <div className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Início
            </Link>{' '}
            / <span className="text-foreground">Montar Kit Festa</span>
          </nav>
          <h1 className="text-balance font-heading text-3xl font-bold sm:text-4xl">
            Monte seu Kit Festa
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Escolha cada item, adicione acabamentos especiais e veja o preço e o prazo
            atualizarem em tempo real. Do seu jeitinho, com a magia da Encantart&apos;s.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <KitBuilder />
      </div>
    </PageShell>
  )
}
