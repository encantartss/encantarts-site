'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, ShoppingBag, Search, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet'
import { categories } from '@/lib/data'

const mainNav = [
  { label: 'Início', href: '/' },
  { label: 'Topos de Bolo', href: '/categorias/topos-de-bolo' },
  { label: 'Kits Festa', href: '/categorias/kits-festa' },
  { label: 'Agendas', href: '/categorias/agendas' },
  { label: 'Montar Kit', href: '/kit-festa' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="bg-primary text-primary-foreground">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs sm:text-sm">
          Frete grátis acima de R$ 250 para todo o Brasil • Personalize do seu jeito
        </p>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-heading text-primary">
                  Encantart&apos;s
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4 pb-8">
                <span className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Categorias
                </span>
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categorias/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {c.name}
                  </Link>
                ))}
                <Link
                  href="/kit-festa"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg bg-secondary px-2 py-2.5 text-sm font-semibold text-secondary-foreground"
                >
                  Montar Kit Festa
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/encantinha-mascote.png"
              alt="Encantinha, mascote da Encantart's"
              width={40}
              height={40}
              className="size-9 rounded-full object-cover"
            />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-lg font-bold text-primary">
                Encantart&apos;s
              </span>
              <span className="hidden text-[10px] text-muted-foreground sm:block">
                A fantástica arte de encantar
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Buscar" className="hidden sm:flex">
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Favoritos" className="hidden sm:flex">
            <Heart className="size-5" />
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Carrinho">
            <Link href="/carrinho" className="relative">
              <ShoppingBag className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                0
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
