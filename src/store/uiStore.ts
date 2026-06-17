import { create } from 'zustand'

type CartView = 'closed' | 'cart' | 'checkout' | 'success'

interface UiState {
  cartView: CartView
  lastOrderId: string | null
  openCart: () => void
  openCheckout: () => void
  openSuccess: (orderId: string) => void
  closeCart: () => void
}

export const useUiStore = create<UiState>((set) => ({
  cartView: 'closed',
  lastOrderId: null,
  openCart: () => set({ cartView: 'cart' }),
  openCheckout: () => set({ cartView: 'checkout' }),
  openSuccess: (orderId) => set({ cartView: 'success', lastOrderId: orderId }),
  closeCart: () => set({ cartView: 'closed' }),
}))
