
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, Tag, Truck, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/data'
import { useCart } from '@/lib/cart-context'

export function CartView() {
  const { items, hydrated, updateQty, removeItem, subtotal } = useCart()

  const [couponInput, setCouponInput] = useState('')
  const [couponMsg, setCouponMsg] = useState('')
  const [cep, setCep] = useState('')
  const [shippingMsg, setShippingMsg] = useState('')

  function applyCoupon() {
    setCouponMsg(
      couponInput.trim()
        ? 'A validação de cupons será ativada após a configuração do checkout.'
        : 'Digite um cupom para continuar.',
    )
  }

  function calcShipping() {
    const normalizedCep = cep.replace(/\D/g, '')

    if (normalizedCep.length !== 8) {
      setShippingMsg('Digite um CEP válido com 8 números.')
      return
    }

    setShippingMsg(
      'A integração com a SuperFrete está em configuração. Nenhum valor fictício será exibido.',
    )
  }

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        Carregando seu carrinho...
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
        <p className="mt-4 font-heading text-lg font-bold">
          Seu carrinho está vazio
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Que tal encantar alguém com nossos produtos?
        </p>
        <Button asChild className="mt-5 rounded-full">
          <Link href="/categorias">Ver produtos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-4">
        {items.map((item) => {
          const customDetails = Object.values(item.custom).filter(Boolean)

          return (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold leading-snug">
                      {item.name}
                    </h3>

                    {customDetails.length > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {customDetails.join(' • ')}
                      </p>
                    )}

                    {item.files.length > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Arquivos selecionados: {item.files.join(', ')}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remover ${item.name}`}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="flex size-8 items-center justify-center disabled:opacity-40"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="size-3.5" />
                    </button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.qty}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="flex size-8 items-center justify-center"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  <span className="font-heading font-bold text-primary">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
            <Tag className="size-4 text-primary" />
            Cupom de desconto
          </h3>

          <div className="mt-3 flex gap-2">
            <Input
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value)
                setCouponMsg('')
              }}
              placeholder="Digite seu cupom"
            />

            <Button onClick={applyCoupon} variant="secondary">
              Aplicar
            </Button>
          </div>

          {couponMsg && (
            <p className="mt-2 text-xs text-muted-foreground" role="status">
              {couponMsg}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
            <Truck className="size-4 text-primary" />
            Calcular frete
          </h3>

          <div className="mt-3 flex gap-2">
            <Input
              value={cep}
              onChange={(e) => {
                setCep(e.target.value)
                setShippingMsg('')
              }}
              placeholder="Digite seu CEP"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={9}
            />

            <Button onClick={calcShipping} variant="secondary">
              Calcular
            </Button>
          </div>

          {shippingMsg && (
            <p className="mt-3 text-xs text-muted-foreground" role="status">
              {shippingMsg}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd>A calcular</dd>
            </div>
          </dl>

          <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
            <span className="font-medium">Subtotal dos produtos</span>
            <span className="font-heading text-2xl font-bold text-primary">
              {formatPrice(subtotal)}
            </span>
          </div>

          <Button size="lg" disabled className="mt-4 w-full rounded-full">
            Checkout em configuração
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            O pagamento será habilitado após os testes de integração com o PagBank.
          </p>
        </div>
      </aside>
    </div>
  )
}
