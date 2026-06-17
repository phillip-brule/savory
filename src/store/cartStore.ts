import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartLine {
  id: string
  name: string
  price: number
  quantity: number
  details?: string
}

interface CartState {
  items: CartLine[]
  addItem: (item: Omit<CartLine, 'quantity'>, quantity?: number) => void
  addCustomItem: (item: Omit<CartLine, 'quantity'>) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: () => number
  subtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id && !item.details)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity }] }
        })
      },

      addCustomItem: (item) => {
        set((state) => ({
          items: [...state.items, { ...item, quantity: 1 }],
        }))
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
      },

      setQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'savory-cart' },
  ),
)
