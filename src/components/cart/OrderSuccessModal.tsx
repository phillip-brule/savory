import { useUiStore } from '../../store/uiStore'
import { site } from '../../data/site'

export function OrderSuccessModal() {
  const lastOrderId = useUiStore((s) => s.lastOrderId)
  const closeCart = useUiStore((s) => s.closeCart)

  if (!lastOrderId) return null

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-2xl text-green">
        ✓
      </span>
      <h3 className="mt-4 font-display text-2xl font-bold text-brown">¡Pedido enviado!</h3>
      <p className="mt-1 font-display text-lg text-wood">Pedido #{lastOrderId}</p>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-brown/70">
        Tu pedido se abrió en WhatsApp con los detalles. Nos pondremos en contacto para
        confirmar y coordinar tu pick-up.
      </p>
      <button
        type="button"
        onClick={closeCart}
        className="mt-8 rounded-full bg-brown px-8 py-3 font-display font-semibold text-cream transition hover:bg-brown-light"
      >
        Listo
      </button>
      <p className="mt-4 text-xs text-brown/40">WhatsApp: {site.whatsappDisplay}</p>
    </div>
  )
}
