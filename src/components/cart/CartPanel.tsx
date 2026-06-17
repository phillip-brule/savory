import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '../../store/cartStore'
import { useUiStore } from '../../store/uiStore'
import { formatCurrency } from '../../utils/formatCurrency'
import { CartLineItem } from './CartLineItem'
import { CheckoutForm } from './CheckoutForm'
import { OrderSuccessModal } from './OrderSuccessModal'

const titles: Record<string, { step: string; title: string }> = {
  cart: { step: 'Tu carrito', title: 'Pedido en curso' },
  checkout: { step: 'Paso final', title: 'Información del pedido' },
  success: { step: '', title: '' },
}

export function CartPanel() {
  const cartView = useUiStore((s) => s.cartView)
  const closeCart = useUiStore((s) => s.closeCart)
  const openCheckout = useUiStore((s) => s.openCheckout)
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)
  const clearCart = useCartStore((s) => s.clearCart)

  const isOpen = cartView !== 'closed'
  const meta = titles[cartView] ?? titles.cart

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone/50 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={meta.title || 'Pedido enviado'}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-brown/10 px-6 py-5">
              <div>
                {meta.step && (
                  <p className="text-xs font-bold uppercase tracking-wider text-wood">{meta.step}</p>
                )}
                {meta.title && (
                  <h2 className="font-display text-xl font-bold text-brown">{meta.title}</h2>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Cerrar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown hover:bg-cream-dark"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartView === 'cart' && (
                <>
                  {items.length === 0 ? (
                    <p className="py-12 text-center text-brown/60">Tu carrito está vacío.</p>
                  ) : (
                    <div>
                      {items.map((item) => (
                        <CartLineItem key={item.id} {...item} />
                      ))}
                    </div>
                  )}

                  {items.length > 0 && (
                    <div className="mt-6 rounded-xl border border-brown/10 bg-cream-dark/50 p-4 text-sm text-brown/70">
                      <p>
                        Pedidos solo para pick up · Mínimo 24h de antelación.
                      </p>
                    </div>
                  )}
                </>
              )}

              {cartView === 'checkout' && <CheckoutForm />}
              {cartView === 'success' && <OrderSuccessModal />}
            </div>

            {cartView === 'cart' && items.length > 0 && (
              <footer className="border-t border-brown/10 px-6 py-5">
                <div className="mb-4 flex justify-between">
                  <span className="text-brown/70">Subtotal</span>
                  <span className="font-display text-lg font-bold text-brown">
                    {formatCurrency(subtotal())}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded-full border border-brown/20 px-4 py-3 text-sm font-semibold text-brown/70 hover:bg-cream-dark"
                  >
                    Vaciar
                  </button>
                  <button
                    type="button"
                    onClick={openCheckout}
                    className="flex-1 rounded-full bg-brown py-3 font-display font-semibold text-cream transition hover:bg-brown-light"
                  >
                    Continuar al checkout
                  </button>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
