'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, Tag, Truck, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/data'

type CartLine = {
  id: string
  name: string
  image: string
  price: number
  qty: number
  custom: string
}

const initialCart: CartLine[] = [
  {
    id: '1',
    name: 'Topo de Bolo Jardim Encantado',
    image: '/images/cat-topo-bolo.png',
    price: 49.9,
    qty: 1,
    custom: 'Maria Clara • 5 anos • Tema Jardim',
  },
  {
    id: '2',
    name: 'Botton Personalizado 44mm',
    image: '/images/cat-bottons.png',
    price: 7.9,
    qty: 10,
    custom: 'Lembrancinha aniversário',
  },
]

const coupons: Record<string, number> = {
  ENCANTAR10: 0.1,
  BEMVINDA: 0.05,
}

export function CartView() {
  const [lines, setLines] = useState<CartLine[]>(initialCart)
  const [couponInput, setCouponInput] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMsg, setCouponMsg] = useState('')
  const [cep, setCep] = useState('')
  const [shipping, setShipping] = useState<{ name: string; price: number }[]>([])
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null)

  function updateQty(id: string, delta: number) {
    setLines((ls) =>
      ls.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l)),
    )
  }

  function removeLine(id: string) {
    setLines((ls) => ls.filter((l) => l.id !== id))
  }

  function applyCoupon() {
    const rate = coupons[couponInput.trim().toUpperCase()]
    if (rate) {
      setDiscount(rate)
      setCouponMsg(`Cupom aplicado: ${rate * 100}% de desconto!`)
    } else {
      setDiscount(0)
      setCouponMsg('Cupom inválido.')
    }
  }

  function calcShipping() {
    // Fase 2: integração real SuperFrete / Melhor Envio por CEP
    if (cep.replace(/\D/g, '').length !== 8) {
      setShipping([])
      setCouponMsg('')
      return
    }
    setShipping([
      { name: 'PAC', price: 18.9 },
      { name: 'Sedex', price: 32.5 },
      { name: 'Transportadora', price: 27.0 },
    ])
    setSelectedShipping(0)
  }

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const discountValue = subtotal * discount
  const shippingValue =
    selectedShipping !== null && shipping[selectedShipping]
      ? shipping[selectedShipping].price
      : 0
  const total = subtotal - discountValue + shippingValue

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
        <p className="mt-4 font-heading text-lg font-bold">Seu carrinho está vazio</p>
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
        {lines.map((l) => (
          <div
            key={l.id}
            className="flex gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src={l.image || '/placeholder.svg'}
                alt={l.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading font-bold leading-snug">{l.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{l.custom}</p>
                </div>
                <button
                  onClick={() => removeLine(l.id)}
                  aria-label={`Remover ${l.name}`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center rounded-full border border-border">
                  <button
                    onClick={() => updateQty(l.id, -1)}
                    className="flex size-8 items-center justify-center"
                    aria-label="Diminuir"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{l.qty}</span>
                  <button
                    onClick={() => updateQty(l.id, 1)}
                    className="flex size-8 items-center justify-center"
                    aria-label="Aumentar"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <span className="font-heading font-bold text-primary">
                  {formatPrice(l.price * l.qty)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
        {/* Cupom */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
            <Tag className="size-4 text-primary" />
            Cupom de desconto
          </h3>
          <div className="mt-3 flex gap-2">
            <Input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Ex: ENCANTAR10"
            />
            <Button onClick={applyCoupon} variant="secondary">
              Aplicar
            </Button>
          </div>
          {couponMsg && (
            <p
              className={`mt-2 text-xs ${
                discount > 0 ? 'text-primary' : 'text-destructive'
              }`}
            >
              {couponMsg}
            </p>
          )}
        </div>

        {/* Frete */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
            <Truck className="size-4 text-primary" />
            Calcular frete
          </h3>
          <div className="mt-3 flex gap-2">
            <Input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite seu CEP"
              inputMode="numeric"
            />
            <Button onClick={calcShipping} variant="secondary">
              Calcular
            </Button>
          </div>
          {shipping.length > 0 && (
            <ul className="mt-3 space-y-2">
              {shipping.map((s, i) => (
                <li key={s.name}>
                  <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping === i}
                        onChange={() => setSelectedShipping(i)}
                        className="accent-[var(--primary)]"
                      />
                      {s.name}
                    </span>
                    <span className="font-medium">{formatPrice(s.price)}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Totais */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discountValue > 0 && (
              <div className="flex justify-between text-primary">
                <dt>Desconto</dt>
                <dd>- {formatPrice(discountValue)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd>{shippingValue > 0 ? formatPrice(shippingValue) : '—'}</dd>
            </div>
          </dl>
          <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
            <span className="font-medium">Total</span>
            <span className="font-heading text-2xl font-bold text-primary">
              {formatPrice(total)}
            </span>
          </div>
          <Button size="lg" className="mt-4 w-full rounded-full">
            Finalizar compra
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Pagamento seguro via PIX, cartão ou boleto
          </p>
        </div>
      </aside>
    </div>
  )
}
