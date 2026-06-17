import { useCartStore } from '../../store/cartStore'
import { useUiStore } from '../../store/uiStore'
import { formatCurrency } from '../../utils/formatCurrency'

export function CartBar() {
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)
  const itemCount = useCartStore((s) => s.itemCount)
  const cartView = useUiStore((s) => s.cartView)
  const openCart = useUiStore((s) => s.openCart)

  if (items.length === 0 || cartView !== 'closed') return null

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-brown px-6 py-3 font-display text-sm font-semibold text-cream shadow-lg transition hover:bg-brown-light"
      aria-label="Ver carrito"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neon text-xs font-bold text-stone">
        {itemCount()}
      </span>
      <span>Ver carrito</span>
      <span className="text-neon">{formatCurrency(subtotal())}</span>
    </button>
  )
}
