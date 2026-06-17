import type { CartLine } from '../store/cartStore'
import { formatCurrency } from './formatCurrency'

export const PAYMENT_METHODS = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'transferencia', label: 'Transferencia bancaria' },
  { value: 'tarjeta', label: 'Tarjeta' },
] as const

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]['value']

export const TIME_SLOTS = [
  { value: '', label: 'Sin preferencia' },
  { value: '9:00 AM – 11:00 AM', label: '9:00 AM – 11:00 AM' },
  { value: '11:00 AM – 1:00 PM', label: '11:00 AM – 1:00 PM' },
  { value: '1:00 PM – 3:00 PM', label: '1:00 PM – 3:00 PM' },
  { value: '3:00 PM – 5:00 PM', label: '3:00 PM – 5:00 PM' },
  { value: '5:00 PM – 6:00 PM', label: '5:00 PM – 6:00 PM' },
] as const

export interface CheckoutData {
  name: string
  phone: string
  date: string
  timeSlot: string
  paymentMethod: PaymentMethod
  notes: string
}

export function generateOrderId(): string {
  const stored = Number(localStorage.getItem('savory-order-seq') ?? '0') + 1
  localStorage.setItem('savory-order-seq', String(stored))
  return String(stored).padStart(4, '0')
}

export function minPickupDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export function formatDateEs(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-DO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function buildOrderMessage(
  orderId: string,
  items: CartLine[],
  checkout: CheckoutData,
  total: number,
): string {
  const paymentLabel = PAYMENT_METHODS.find((p) => p.value === checkout.paymentMethod)?.label
  const timeLine = checkout.timeSlot || 'Sin preferencia'

  const lines = items.map((item) => {
    const line = `• ${item.quantity}× ${item.name} — ${formatCurrency(item.price * item.quantity)}`
    return item.details ? `${line}\n  _(${item.details})_` : line
  })

  const parts = [
    `🛒 *Pedido Savory #${orderId}*`,
    '',
    `*Cliente:* ${checkout.name}`,
    `*Tel:* ${checkout.phone}`,
    `*Pick-up:* ${formatDateEs(checkout.date)}, ${timeLine}`,
    `*Pago:* ${paymentLabel}`,
    '',
    '*Pedido:*',
    ...lines,
    '',
    `*Total:* ${formatCurrency(total)}`,
  ]

  if (checkout.notes.trim()) {
    parts.push('', `*Notas:* ${checkout.notes.trim()}`)
  }

  return parts.join('\n')
}
