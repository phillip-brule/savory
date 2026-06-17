import { useCartStore } from '../../store/cartStore'
import { formatCurrency } from '../../utils/formatCurrency'

interface CartLineItemProps {
  id: string
  name: string
  price: number
  quantity: number
  details?: string
}

export function CartLineItem({ id, name, price, quantity, details }: CartLineItemProps) {
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex items-start justify-between gap-3 border-b border-brown/10 py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold text-brown">{name}</p>
        {details && <p className="mt-1 text-xs leading-relaxed text-brown/60">{details}</p>}
        <p className="mt-1 text-sm text-brown/60">{formatCurrency(price)} c/u</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQuantity(id, quantity - 1)}
          aria-label="Restar"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-brown/20 text-brown transition hover:bg-cream-dark"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold text-brown">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity(id, quantity + 1)}
          aria-label="Sumar"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-brown/20 text-brown transition hover:bg-cream-dark"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-brown">{formatCurrency(price * quantity)}</p>
        <button
          type="button"
          onClick={() => removeItem(id)}
          className="text-xs text-brown/40 hover:text-brown"
        >
          Quitar
        </button>
      </div>
    </div>
  )
}
