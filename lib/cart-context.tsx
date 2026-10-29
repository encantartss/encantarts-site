
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CartItem = {
  id: string
  slug: string
  name: string
  image: string
  price: number
  qty: number
  custom: Record<string, string>
  files: string[]
}

type AddCartItem = Omit<CartItem, 'id'>

type CartContextValue = {
  items: CartItem[]
  hydrated: boolean
  addItem: (item: AddCartItem) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  subtotal: number
}

const STORAGE_KEY = 'encantarts-cart-v1'

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setItems(parsed as CartItem[])
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((item: AddCartItem) => {
    setItems((current) => [
      ...current,
      { ...item, id: crypto.randomUUID() },
    ])
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (!Number.isInteger(qty) || qty < 1) return

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, qty } : item,
      ),
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      hydrated,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      subtotal,
    }),
    [
      items,
      hydrated,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      subtotal,
    ],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart precisa estar dentro de CartProvider')
  }

  return context
}
