
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, ShoppingBag, FileImage, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Product, formatPrice } from '@/lib/data'
import { useCart } from '@/lib/cart-context'

export function ProductCustomizer({ product }: { product: Product }) {
  const router = useRouter()
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [files, setFiles] = useState<string[]>([])
  const [added, setAdded] = useState(false)

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files
    if (!list) return

    const names = Array.from(list).map((file) => file.name)
    setFiles((prev) => [...prev, ...names])
    e.target.value = ''
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((file) => file !== name))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!confirmed || added) return

    const form = e.currentTarget
    const formData = new FormData(form)
    const custom: Record<string, string> = {}

    for (const field of product.customFields) {
      const value = formData.get(field.id)

      if (typeof value === 'string') {
        custom[field.id] = value
      }
    }

    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: quantity,
      custom,
      files,
    })

    setAdded(true)
    router.push('/carrinho')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-heading text-lg font-bold">
          Personalize seu pedido
        </h2>
        <p className="text-sm text-muted-foreground">
          Preencha os detalhes para deixarmos tudo com a sua cara.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {product.customFields.map((field) => (
          <div
            key={field.id}
            className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
          >
            <Label htmlFor={field.id} className="mb-1.5 block">
              {field.label}
              {field.required && (
                <span className="ml-0.5 text-primary">*</span>
              )}
            </Label>

            {field.type === 'textarea' ? (
              <Textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                rows={3}
              />
            ) : field.type === 'select' ? (
              <Select name={field.id} required={field.required}>
                <SelectTrigger id={field.id}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>

      <div>
        <Label className="mb-1.5 block">
          Fotos, logotipo e referências
        </Label>

        <label
          htmlFor="file-upload"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-4 py-6 text-center transition-colors hover:border-primary hover:bg-muted"
        >
          <Upload className="size-6 text-primary" />
          <span className="text-sm font-medium">
            Clique para enviar arquivos
          </span>
          <span className="text-xs text-muted-foreground">
            PNG, JPG ou PDF • até 10MB cada
          </span>

          <input
            id="file-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,application/pdf"
            multiple
            className="sr-only"
            onChange={handleUpload}
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2 truncate">
                  <FileImage className="size-4 shrink-0 text-primary" />
                  <span className="truncate">{name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(name)}
                  aria-label={`Remover ${name}`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Label className="font-medium">Quantidade</Label>
        <div className="flex items-center rounded-full border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-10 items-center justify-center text-lg font-bold"
            aria-label="Diminuir"
          >
            −
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-10 items-center justify-center text-lg font-bold"
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-secondary/40 p-4">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
        />
        <span className="text-sm font-medium">
          Confirmo que os dados estão corretos
        </span>
      </label>

      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="font-heading text-2xl font-bold text-primary">
          {formatPrice(product.price * quantity)}
        </span>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={!confirmed || added}
        className="w-full rounded-full"
      >
        {added ? (
          <>
            <Check className="size-5" />
            Adicionado ao carrinho!
          </>
        ) : (
          <>
            <ShoppingBag className="size-5" />
            Adicionar ao carrinho
          </>
        )}
      </Button>

      {!confirmed && (
        <p className="text-center text-xs text-muted-foreground">
          Marque a confirmação dos dados para continuar
        </p>
      )}
    </form>
  )
}
