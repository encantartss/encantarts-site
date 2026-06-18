'use client'

import { useMemo, useState } from 'react'
import { Plus, Minus, Sparkles, Clock, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/data'

type KitItem = { id: string; name: string; price: number; days: number }

const baseItems: KitItem[] = [
  { id: 'topo', name: 'Topo de bolo', price: 49.9, days: 5 },
  { id: 'forminhas', name: 'Forminhas (kit 50un)', price: 24.9, days: 4 },
  { id: 'toppers', name: 'Toppers (kit 20un)', price: 19.9, days: 4 },
  { id: 'porta-bis', name: 'Porta Bis (kit 20un)', price: 22.9, days: 4 },
  { id: 'tags', name: 'Tags personalizadas (kit 30un)', price: 16.9, days: 3 },
  { id: 'bottons', name: 'Bottons (kit 10un)', price: 39.9, days: 4 },
  { id: 'chaveiros', name: 'Chaveiros (kit 10un)', price: 59.9, days: 5 },
  { id: 'caixinhas', name: 'Caixinhas (kit 20un)', price: 34.9, days: 5 },
  { id: 'adesivos', name: 'Adesivos (cartela)', price: 12.9, days: 3 },
]

const extras: KitItem[] = [
  { id: 'lamicote', name: 'Papel Lamicote', price: 9.9, days: 0 },
  { id: 'glitter', name: 'Papel Glitter', price: 12.9, days: 0 },
  { id: 'chaton', name: 'Aplicação de Chaton', price: 14.9, days: 1 },
  { id: 'fitas', name: 'Fitas decorativas especiais', price: 8.9, days: 0 },
]

export function KitBuilder() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({})

  function setQty(id: string, delta: number) {
    setQuantities((q) => {
      const next = Math.max(0, (q[id] ?? 0) + delta)
      return { ...q, [id]: next }
    })
  }

  function toggleExtra(id: string) {
    setSelectedExtras((e) => ({ ...e, [id]: !e[id] }))
  }

  const { total, days, count } = useMemo(() => {
    let total = 0
    let days = 0
    let count = 0
    for (const item of baseItems) {
      const qty = quantities[item.id] ?? 0
      if (qty > 0) {
        total += item.price * qty
        days = Math.max(days, item.days)
        count += qty
      }
    }
    for (const ex of extras) {
      if (selectedExtras[ex.id]) {
        total += ex.price
        days = Math.max(days, ex.days)
      }
    }
    return { total, days, count }
  }, [quantities, selectedExtras])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      {/* Itens */}
      <div className="space-y-8">
        <div>
          <h2 className="font-heading text-xl font-bold">Escolha os itens do seu kit</h2>
          <p className="text-sm text-muted-foreground">
            Selecione a quantidade de cada item. O preço atualiza na hora.
          </p>
          <ul className="mt-4 space-y-3">
            {baseItems.map((item) => {
              const qty = quantities[item.id] ?? 0
              return (
                <li
                  key={item.id}
                  className={`flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
                    qty > 0 ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  }`}
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-primary">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center rounded-full border border-border bg-background">
                    <button
                      type="button"
                      onClick={() => setQty(item.id, -1)}
                      className="flex size-9 items-center justify-center"
                      aria-label={`Diminuir ${item.name}`}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(item.id, 1)}
                      className="flex size-9 items-center justify-center"
                      aria-label={`Aumentar ${item.name}`}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-heading text-xl font-bold">
            <Sparkles className="size-5 text-[var(--gold)]" />
            Acabamentos especiais
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {extras.map((ex) => (
              <label
                key={ex.id}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition-colors ${
                  selectedExtras[ex.id]
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card'
                }`}
              >
                <span>
                  <span className="block font-medium">{ex.name}</span>
                  <span className="text-sm text-primary">+{formatPrice(ex.price)}</span>
                </span>
                <input
                  type="checkbox"
                  checked={!!selectedExtras[ex.id]}
                  onChange={() => toggleExtra(ex.id)}
                  className="size-5 accent-[var(--primary)]"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Resumo fixo */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-heading text-lg font-bold">Resumo do seu kit</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Itens selecionados</dt>
              <dd className="font-medium">{count}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="size-4" />
                Prazo estimado
              </dt>
              <dd className="font-medium">
                {days > 0 ? `${days} dias úteis` : '—'}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-heading text-3xl font-bold text-primary">
              {formatPrice(total)}
            </span>
          </div>
          <Button
            size="lg"
            disabled={count === 0}
            className="mt-5 w-full rounded-full"
          >
            <ShoppingBag className="size-5" />
            Gerar orçamento do kit
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Converta seu orçamento em pedido a qualquer momento
          </p>
        </div>
      </aside>
    </div>
  )
}
