import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { CartView } from '@/components/cart-view'

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'Revise seus itens, aplique cupons e calcule o frete antes de finalizar sua compra na Encantart\u0027s Papelaria Criativa.',
  robots: { index: false, follow: true },
}

export default function CarrinhoPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Seu carrinho
        </h1>
        <p className="mt-2 text-muted-foreground">
          Revise seus itens, aplique um cupom e calcule o frete para o seu CEP.
        </p>
        <div className="mt-8">
          <CartView />
        </div>
      </div>
    </PageShell>
  )
}
