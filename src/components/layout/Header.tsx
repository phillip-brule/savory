import { useState } from 'react'
import { useCartStore } from '../../store/cartStore'
import { useUiStore } from '../../store/uiStore'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#menu', label: 'Menú' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6L5 3H2" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount)
  const openCart = useUiStore((s) => s.openCart)

  function handleOpenCart() {
    setOpen(false)
    openCart()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brown/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone font-display text-lg font-bold text-neon">
            S
          </span>
          <span className="hidden font-display text-lg font-semibold text-brown sm:block">
            Savory <span className="text-green">Sips & Bites</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brown/80 transition-colors hover:text-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenCart}
            aria-label="Ver carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown transition hover:bg-cream-dark"
          >
            <CartIcon className="h-5 w-5" />
            {itemCount() > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon px-1 text-[10px] font-bold text-stone">
                {itemCount()}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 md:hidden"
          >
            <span className="sr-only">Menú</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-brown" fill="none" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brown/10 bg-cream px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display font-semibold text-brown"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleOpenCart}
              className="mt-2 rounded-full bg-brown px-4 py-2 text-center text-sm font-bold text-cream"
            >
              Ver carrito{itemCount() > 0 ? ` (${itemCount()})` : ''}
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
