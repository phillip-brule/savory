import { useState, type FormEvent } from 'react'
import { useCartStore } from '../../store/cartStore'
import { useUiStore } from '../../store/uiStore'
import { site, whatsAppUrl } from '../../data/site'
import { formatCurrency } from '../../utils/formatCurrency'
import {
  DELIVERY_NOTICE,
  DELIVERY_TYPES,
  DEPOSIT_NOTICE,
  PAYMENT_METHODS,
  TIME_SLOTS,
  buildOrderMessage,
  generateOrderId,
  minPickupDate,
  type CheckoutData,
  type DeliveryType,
  type PaymentMethod,
} from '../../utils/order'

export function CheckoutForm() {
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)
  const clearCart = useCartStore((s) => s.clearCart)
  const openCart = useUiStore((s) => s.openCart)
  const openSuccess = useUiStore((s) => s.openSuccess)

  const [form, setForm] = useState<CheckoutData>({
    name: '',
    phone: '',
    deliveryType: 'pickup',
    date: '',
    timeSlot: '',
    paymentMethod: 'transferencia',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutData, string>>>({})

  const total = subtotal()
  const isDelivery = form.deliveryType === 'delivery'

  function validate(): boolean {
    const next: Partial<Record<keyof CheckoutData, string>> = {}
    if (!form.name.trim()) next.name = 'Requerido'
    if (!form.phone.trim()) next.phone = 'Requerido'
    if (!form.date) {
      next.date = 'Requerido'
    } else if (form.date < minPickupDate()) {
      next.date = 'Mínimo 24 horas de antelación'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const orderId = generateOrderId()
    const message = buildOrderMessage(orderId, items, form, total)
    clearCart()
    openSuccess(orderId)
    window.open(whatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  function update<K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="rounded-xl border border-wood/30 bg-cream-dark/60 p-4">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-wood">Importante</p>
        <p className="mt-2 text-sm leading-relaxed text-brown/80">
          Los pedidos se preparan con mínimo 24 horas de antelación. Coordinamos los detalles
          contigo por WhatsApp.
        </p>
      </div>

      <fieldset className="space-y-5">
        <legend className="sr-only">Datos del cliente</legend>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-wood">
            Nombre completo *
          </span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Juan Pérez González"
            className="mt-1 w-full border-b border-brown/20 bg-transparent py-2 text-brown placeholder:text-brown/30 focus:border-green focus:outline-none"
          />
          {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
        </label>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-wood">Teléfono *</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(809) 123-4567"
            className="mt-1 w-full border-b border-brown/20 bg-transparent py-2 text-brown placeholder:text-brown/30 focus:border-green focus:outline-none"
          />
          {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
        </label>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-wider text-wood">
          Tipo de entrega
        </legend>

        <div className="flex flex-wrap gap-3">
          {DELIVERY_TYPES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update('deliveryType', opt.value as DeliveryType)}
              className={`rounded-full px-6 py-2.5 font-display text-sm font-semibold transition ${
                form.deliveryType === opt.value
                  ? 'bg-brown text-cream shadow-md'
                  : 'border-2 border-brown/15 bg-white text-brown hover:border-rust'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {isDelivery && (
          <p className="rounded-xl border border-green/20 bg-green/5 p-3 text-sm leading-relaxed text-brown/80">
            {DELIVERY_NOTICE}
          </p>
        )}
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-xs font-bold uppercase tracking-wider text-wood">
          {isDelivery ? 'Fecha de entrega' : 'Fecha de pick-up'}
        </legend>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-wood">Fecha *</span>
          <input
            type="date"
            value={form.date}
            min={minPickupDate()}
            onChange={(e) => update('date', e.target.value)}
            className="mt-1 w-full border-b border-brown/20 bg-transparent py-2 text-brown focus:border-green focus:outline-none"
          />
          <p className="mt-1 text-xs text-brown/50">Mínimo 24h de antelación.</p>
          {errors.date && <span className="text-xs text-red-600">{errors.date}</span>}
        </label>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-wood">Hora preferida</span>
          <select
            value={form.timeSlot}
            onChange={(e) => update('timeSlot', e.target.value)}
            className="mt-1 w-full border-b border-brown/20 bg-transparent py-2 text-brown focus:border-green focus:outline-none"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-wood">Método de pago *</span>
        <select
          value={form.paymentMethod}
          onChange={(e) => update('paymentMethod', e.target.value as PaymentMethod)}
          className="mt-1 w-full border-b border-brown/20 bg-transparent py-2 text-brown focus:border-green focus:outline-none"
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-wood">Notas para el pedido</span>
        <textarea
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder={
            isDelivery
              ? 'Ej: dirección de entrega, referencias, mensaje en la caja.'
              : 'Ej: es para un cumpleaños, escribir mensaje en la caja.'
          }
          rows={3}
          className="mt-1 w-full resize-none border-b border-brown/20 bg-transparent py-2 text-brown placeholder:text-brown/30 focus:border-green focus:outline-none"
        />
      </label>

      <div className="rounded-xl bg-cream-dark p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-wood">Resumen</p>
        <ul className="mt-4 space-y-2">
          {items.map((item, i) => (
            <li key={item.id} className="text-sm text-brown/80">
              <div className="flex justify-between gap-4">
                <span>
                  {i + 1}. {item.name} (x{item.quantity})
                </span>
                <span className="shrink-0 font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
              {item.details && (
                <p className="mt-0.5 pl-4 text-xs text-brown/50">{item.details}</p>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-brown/10 pt-4 text-sm">
          <span className="text-brown/70">Subtotal productos</span>
          <span className="font-semibold">{formatCurrency(total)}</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-display text-lg font-bold text-brown">Total</span>
          <span className="font-display text-2xl font-bold text-brown">{formatCurrency(total)}</span>
        </div>
        <p className="mt-4 border-t border-brown/10 pt-4 text-sm leading-relaxed text-brown/70">
          Adelanto (50%): <span className="font-semibold text-brown">{formatCurrency(total * 0.5)}</span>
        </p>
      </div>

      <div className="rounded-xl border border-honey/40 bg-honey/10 p-4">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-rust">Pago y agendamiento</p>
        <p className="mt-2 text-sm leading-relaxed text-brown/80">{DEPOSIT_NOTICE}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={openCart}
          className="flex-1 rounded-full border border-brown/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-brown transition hover:bg-cream-dark"
        >
          Volver al carrito
        </button>
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brown px-6 py-3 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-brown-light"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enviar por WhatsApp
        </button>
      </div>

      <p className="text-center text-xs text-brown/40">
        Se abrirá WhatsApp ({site.whatsappDisplay}) con los detalles de tu pedido.
      </p>
    </form>
  )
}
